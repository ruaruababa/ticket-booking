import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import {
  LoginRequest,
  LoginResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(plainText: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const { username, password } = request;
    
    // Find user by username
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return {
        success: false,
        token: '',
        refreshToken: '',
        message: 'Invalid username or password',
        user: null,
      };
    }
    
    // Verify password
    const isPasswordValid = await this.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        token: '',
        refreshToken: '',
        message: 'Invalid username or password',
        user: null,
      };
    }
    
    // Generate tokens
    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d') },
    );
    
    // Remove sensitive data
    const { password: _, passwordResetToken: __, passwordResetExpires: ___, ...userResponse } = user;
    
    return {
      success: true,
      token,
      refreshToken,
      message: 'Login successful',
      user: userResponse as any,
    };
  }

  async validateToken(request: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    const { token } = request;
    
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findById(payload.sub);
      
      if (!user) {
        return { valid: false };
      }
      
      // Remove sensitive data
      const { password, passwordResetToken, passwordResetExpires, ...userResponse } = user;
      
      return {
        valid: true,
        user: userResponse as any,
      };
    } catch (error) {
      return { valid: false };
    }
  }

  async changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const { userId, currentPassword, newPassword } = request;
    
    // Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    
    // Verify current password
    const isPasswordValid = await this.comparePasswords(currentPassword, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Current password is incorrect',
      };
    }
    
    // Hash and update new password
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(userId, { password: hashedPassword });
    
    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  async requestPasswordReset(request: RequestPasswordResetRequest): Promise<RequestPasswordResetResponse> {
    const { email } = request;
    
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // For security reasons, don't reveal that the email doesn't exist
      return {
        success: true,
        message: 'If your email is registered, you will receive a password reset link',
      };
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Set token expiration (1 hour)
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
    
    // Save token to user
    await this.userRepository.setPasswordResetToken(user.id, hashedToken, expiresIn);
    
    // In a real application, you would send an email with the reset token
    // For this example, we'll just return the token in the response
    return {
      success: true,
      message: `Password reset requested. Token: ${resetToken}`,
    };
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const { token, newPassword } = request;
    
    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    // Find user with valid token
    const user = await this.userRepository.findByPasswordResetToken(hashedToken);
    if (!user) {
      return {
        success: false,
        message: 'Invalid or expired password reset token',
      };
    }
    
    // Hash and update password
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });
    
    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}
