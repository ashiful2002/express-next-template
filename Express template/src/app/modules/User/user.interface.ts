import { UserRole, UserStatus } from "../../../generated/prisma/enums";

export interface IUserFilterRequest {
    searchTerm?: string;
    role?: UserRole;
    status?: UserStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IUpdateProfile {
    name?: string;
    image?: string;
}

export interface IUpdateUserByAdmin {
    name?: string;
    image?: string;
    role?: UserRole;
    status?: UserStatus;
}