// Enums
export enum UserRole {
  USER = 0,
  ADMIN = 1,
  SUPPORT = 2,
}

export enum UserStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  SUSPENDED = 2,
  PENDING_VERIFICATION = 3,
}

// Data structures
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  status: UserStatus;
  preferences?: string[];
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

// Request types
export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: UserRole;
  address?: Address;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface FindByIdRequest {
  id: string;
}

export interface FindByUsernameRequest {
  username: string;
}

export interface FindByEmailRequest {
  email: string;
}

export interface FindAllRequest {
  page: number;
  limit: number;
  sortBy?: string;
  sortDesc?: boolean;
  searchTerm?: string;
  filterByRole?: UserRole;
}

export interface UpdateUserRequest {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  status?: UserStatus;
  address?: Address;
  preferences?: string[];
}

export interface DeleteUserRequest {
  id: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ValidateTokenRequest {
  token: string;
}

export interface ChangePasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Response types
export interface UserResponse {
  user: User;
  message: string;
}

export interface FindAllResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  message: string;
  user: User;
}

export interface ValidateTokenResponse {
  valid: boolean;
  user?: User;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface RequestPasswordResetResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
