import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// Import interfaces that match our proto definitions
// These would typically be generated or manually created to match the proto
import {
  ChangePasswordRequest,
  CreateUserRequest,
  DeleteUserRequest,
  FindAllRequest,
  FindByEmailRequest,
  FindByIdRequest,
  FindByUsernameRequest,
  LoginRequest,
  RegisterRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
  ValidateTokenRequest,
} from './interfaces/user.interface';

// These interfaces should match the messages in user.proto
interface UserById {
  id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller()
export class UserController {
  // In a real application, you would inject services here
  // constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Create')
  async create(
    data: CreateUserRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Create user request received:', data);

    // In a real application, you would call your service here
    // return this.userService.create(data);

    // For now, return a mock response
    return {
      user: {
        id: 'generated-id-123',
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        role: data.role,
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'User created successfully',
    };
  }

  @GrpcMethod('UserService', 'FindById')
  async findById(
    data: FindByIdRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Find user by ID request received:', data);

    // Mock response
    return {
      user: {
        id: data.id,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        role: 0, // USER
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'User found',
    };
  }

  @GrpcMethod('UserService', 'FindByUsername')
  async findByUsername(
    data: FindByUsernameRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Find user by username request received:', data);

    // Mock response
    return {
      user: {
        id: 'user-id-123',
        username: data.username,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        role: 0, // USER
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'User found',
    };
  }

  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(
    data: FindByEmailRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Find user by email request received:', data);

    // Mock response
    return {
      user: {
        id: 'user-id-123',
        username: 'testuser',
        email: data.email,
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        role: 0, // USER
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'User found',
    };
  }

  @GrpcMethod('UserService', 'FindAll')
  async findAll(
    data: FindAllRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Find all users request received:', data);

    // Mock response with pagination
    return {
      users: [
        {
          id: 'user-id-1',
          username: 'user1',
          email: 'user1@example.com',
          firstName: 'User',
          lastName: 'One',
          phoneNumber: '1234567890',
          role: 0, // USER
          status: 0, // ACTIVE
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'user-id-2',
          username: 'user2',
          email: 'user2@example.com',
          firstName: 'User',
          lastName: 'Two',
          phoneNumber: '0987654321',
          role: 0, // USER
          status: 0, // ACTIVE
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      total: 2,
      page: data.page,
      limit: data.limit,
      pages: 1,
    };
  }

  @GrpcMethod('UserService', 'Update')
  async update(
    data: UpdateUserRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Update user request received:', data);

    // Mock response
    return {
      user: {
        id: data.id,
        username: data.username || 'testuser',
        email: data.email || 'test@example.com',
        firstName: data.firstName || 'Test',
        lastName: data.lastName || 'User',
        phoneNumber: data.phoneNumber || '1234567890',
        role: data.role !== undefined ? data.role : 0, // USER
        status: data.status !== undefined ? data.status : 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'User updated successfully',
    };
  }

  @GrpcMethod('UserService', 'Delete')
  async delete(
    data: DeleteUserRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Delete user request received:', data);

    // Mock response
    return {
      success: true,
      message: `User with ID ${data.id} deleted successfully`,
    };
  }

  @GrpcMethod('UserService', 'Register')
  async register(
    data: RegisterRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Register user request received:', data);

    // Mock response
    return {
      user: {
        id: 'generated-id-123',
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        role: 0, // USER
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'Registration successful',
    };
  }

  @GrpcMethod('UserService', 'Login')
  async login(
    data: LoginRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Login request received:', data);

    // Mock response
    return {
      success: true,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      message: 'Login successful',
      user: {
        id: 'user-id-123',
        username: data.username,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        role: 0, // USER
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  @GrpcMethod('UserService', 'ValidateToken')
  async validateToken(
    data: ValidateTokenRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Validate token request received:', data);

    // Mock response
    return {
      valid: true,
      user: {
        id: 'user-id-123',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        role: 0, // USER
        status: 0, // ACTIVE
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  @GrpcMethod('UserService', 'ChangePassword')
  async changePassword(
    data: ChangePasswordRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Change password request received:', data);

    // Mock response
    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  @GrpcMethod('UserService', 'RequestPasswordReset')
  async requestPasswordReset(
    data: RequestPasswordResetRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Request password reset received:', data);

    // Mock response
    return {
      success: true,
      message:
        'If your email is registered, you will receive a password reset link',
    };
  }

  @GrpcMethod('UserService', 'ResetPassword')
  async resetPassword(
    data: ResetPasswordRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('Reset password request received:', data);

    // Mock response
    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }

  @GrpcMethod('UserService', 'FindOneUser')
  findOneUser(data: UserById): User {
    // In a real app, you would fetch data from a database
    const items = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
