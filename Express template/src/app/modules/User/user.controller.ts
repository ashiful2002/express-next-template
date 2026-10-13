import { Request, Response } from 'express';
import status from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { UserService } from './user.service';
import AppError from '../../errorHelpers/appError';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError(status.UNAUTHORIZED, 'Unauthorized access');
    }

    const result = await UserService.getMyProfile(userId);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'User profile fetched successfully',
        data: result,
    });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError(status.UNAUTHORIZED, 'Unauthorized access');
    }

    const result = await UserService.updateMyProfile(userId, req.body);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'User profile updated successfully',
        data: result,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers(req.query);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await UserService.getUserById(id);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
});

const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await UserService.updateUserByAdmin(id, req.body);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await UserService.deleteUser(id);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
});

export const UserController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    getUserById,
    updateUserByAdmin,
    deleteUser,
};