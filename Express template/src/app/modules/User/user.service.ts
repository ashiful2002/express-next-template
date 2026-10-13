import status from 'http-status';
import AppError from '../../errorHelpers/appError';
import { prisma } from '../../lib/prisma';
import { IUserFilterRequest, IUpdateProfile, IUpdateUserByAdmin } from './user.interface';
import { UserStatus } from '../../../generated/prisma/enums';

const getMyProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
        },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }

    if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
        throw new AppError(status.FORBIDDEN, 'User account is not active');
    }

    return user;
};

const updateMyProfile = async (userId: string, payload: IUpdateProfile) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
        },
    });

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }

    if (isUserExist.status === UserStatus.BLOCKED || isUserExist.status === UserStatus.DELETED) {
        throw new AppError(status.FORBIDDEN, 'User account is not active');
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...(payload.name && { name: payload.name }),
            ...(payload.image !== undefined && { image: payload.image }),
        },
    });

    return updatedUser;
};

const getAllUsers = async (filters: IUserFilterRequest) => {
    const {
        searchTerm,
        role,
        status: userStatus,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
    } = filters;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const andConditions: any[] = [];

    // Search condition
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    email: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    }

    // Filter by role
    if (role) {
        andConditions.push({ role });
    }

    // Filter by status
    if (userStatus) {
        andConditions.push({ status: userStatus });
    }

    // Exclude soft-deleted users by default
    andConditions.push({ isDeleted: false });

    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where: whereConditions,
            skip,
            take: limitNumber,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.user.count({
            where: whereConditions,
        }),
    ]);

    const totalPages = Math.ceil(total / limitNumber);

    return {
        data: users,
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages,
        },
    };
};

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }

    return user;
};

const updateUserByAdmin = async (id: string, payload: IUpdateUserByAdmin) => {
    const isUserExist = await prisma.user.findUnique({
        where: { id },
    });

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            ...(payload.name && { name: payload.name }),
            ...(payload.image !== undefined && { image: payload.image }),
            ...(payload.role && { role: payload.role }),
            ...(payload.status && {
                status: payload.status,
                isDeleted: payload.status === UserStatus.DELETED,
                deletedAt: payload.status === UserStatus.DELETED ? new Date() : null,
            }),
        },
    });

    return updatedUser;
};

const deleteUser = async (id: string) => {
    const isUserExist = await prisma.user.findUnique({
        where: { id },
    });

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }

    const deletedUser = await prisma.user.update({
        where: { id },
        data: {
            isDeleted: true,
            status: UserStatus.DELETED,
            deletedAt: new Date(),
        },
    });

    return deletedUser;
};

export const UserService = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    getUserById,
    updateUserByAdmin,
    deleteUser,
};