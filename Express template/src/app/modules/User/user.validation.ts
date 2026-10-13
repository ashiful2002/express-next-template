import { z } from 'zod';
import { UserRole, UserStatus } from '../../../generated/prisma/enums';

const updateProfileZodSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    image: z.string().url('Image must be a valid URL').optional().nullable(),
});

const updateUserByAdminZodSchema = z.object({
    name: z.string().min(1).optional(),
    image: z.string().url().optional().nullable(),
    role: z.nativeEnum(UserRole).optional(),
    status: z.nativeEnum(UserStatus).optional(),
});

export const UserValidation = {
    updateProfileZodSchema,
    updateUserByAdminZodSchema,
};