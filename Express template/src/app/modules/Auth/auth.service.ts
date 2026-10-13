import status from "http-status";
import { UserRole, UserStatus } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/appError";
import { auth } from "../../lib/auth";
import { tokenUtils } from "../../utils/token";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import {
    IChangePasswordPayload,
    ISignInPayload,
    ISignUpPayload,
} from "./auth.interface";
import { ISession } from "../../interfaces";

const signUp = async (
    payload: ISignUpPayload,
    headers?: Record<string, string>
) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            // default value set in auth.ts
            role: UserRole.CUSTOMER,
        },
        headers: headers,
    });

    if (!data.user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    // if there is relation between models there should be
    // transection to create more models

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    return {
        user: data.user,
        token: data.token,
        accessToken,
        refreshToken,
    };
};

const login = async (payload: ISignInPayload) => {
    const { email, password } = payload;
    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });

    if (!data.user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new AppError(status.UNAUTHORIZED, "User is deleted");
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    return {
        user: data.user,
        token: data.token,
        accessToken,
        refreshToken,
    };
};

const getMe = async (user?: IRequestUser) => {
    if (!user?.userId) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized access!");
    }
    const isUserExists = await prisma.user.findUnique({
        where: {
            id: user.userId,
        },
    });
    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    return isUserExists;
};

const getNewToken = async (refreshToken: string, sessionToken: string) => {
    // check sesstion token exists in database
    const isSessionTokenExists = await prisma.session.findUnique({
        where: {
            token: sessionToken,
        },
        include: {
            user: true,
        },
    });

    if (!isSessionTokenExists) {
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

    const verifiedRefreshToken = jwtUtils.verifyToken(
        refreshToken,
        envVars.REFRESH_TOKEN_SECRET
    );

    if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
        throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
    }

    const data = verifiedRefreshToken.data as JwtPayload;

    const newAccessToken = tokenUtils.getAccessToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

    const { token } = await prisma.session.update({
        where: {
            token: sessionToken,
        },
        data: {
            token: sessionToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000), // current time + 1 day
            updatedAt: new Date(),
        },
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        sessionToken: token,
    };
};

const logoutUser = async (sessionToken: string) => {
    const result = await auth.api.signOut({
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`,
        }),
    });

    return result;
};

const changePassword = async (
    payload: IChangePasswordPayload,
    sessionToken: string
) => {
    const session = await auth.api.getSession({
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`,
        }),
    });

    if (!session) {
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

    const { currentPassword, newPassword } = payload;

    const result = await auth.api.changePassword({
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`,
        }),
        body: {
            currentPassword,
            newPassword,
            revokeOtherSessions: true, // why this used not clear to me
        },
    });



    // if (session.user.needPasswordChange) {
    //     await prisma.user.update({
    //         where: {
    //             id: session.user.id
    //         },
    //         data: {
    //             needPasswordChange: false
    //         }
    //     })
    // }


    const newAccessToken = tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });

    return {
        ...result,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};

const verifyEmail = async (email: string, otp: string) => {
    const result = await auth.api.verifyEmailOTP({
        body: {
            email,
            otp,
        },
    });
    if (result.status && !result.user.emailVerified) {
        await prisma.user.update({
            where: {
                email,
            },
            data: {
                emailVerified: true,
            },
        });
    }
};

const forgotPassword = async (email: string) => {
    const isUserExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    if (isUserExists && !isUserExists.emailVerified) {
        throw new AppError(status.FORBIDDEN, "Email is not verified");
    }
    if (isUserExists.isDeleted || isUserExists.status === UserStatus.DELETED) {
        throw new AppError(status.FORBIDDEN, "User is deleted");
    }

    await auth.api.requestPasswordResetEmailOTP({
        body: {
            email,
        },
    });
};
const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string
) => {
    const isUserExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    if (isUserExists && !isUserExists.emailVerified) {
        throw new AppError(status.FORBIDDEN, "Email is not verified");
    }
    if (isUserExists.isDeleted || isUserExists.status === UserStatus.DELETED) {
        throw new AppError(status.FORBIDDEN, "User is deleted");
    }

    await auth.api.resetPasswordEmailOTP({
        body: {
            email,
            otp,
            password: newPassword,
        },
    });


    if (isUserExists.needPasswordChange) {
        await prisma.user.update({
            where: {
                id: isUserExists.id
            },
            data: {
                needPasswordChange: false
            }
        })
    }

    await prisma.session.deleteMany({
        where: {
            userId: isUserExists.id,
        },
    });
};

const googleLoginSuccess = async (sesstion: ISession) => {

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: sesstion.user.email,
        },
    });

    if (!isUserExists) {
        await prisma.user.create({
            data: {
                id: sesstion.user.id,
                email: sesstion.user.email,
                name: sesstion.user.name,
            },
        });
    }


    const accessToken = tokenUtils.getAccessToken({
        userId: sesstion.user.id,
        role: sesstion.user.role,
        name: sesstion.user.name,
        email: sesstion.user.email,
        status: sesstion.user.status,
        isDeleted: sesstion.user.isDeleted,
        emailVerified: sesstion.user.emailVerified,
    })

    const refreshToken = tokenUtils.getRefreshToken({
        userId: sesstion.user.id,
        role: sesstion.user.role,
        name: sesstion.user.name,
        email: sesstion.user.email,
        status: sesstion.user.status,
        isDeleted: sesstion.user.isDeleted,
        emailVerified: sesstion.user.emailVerified,
    })

    return {
        accessToken,
        refreshToken,
    }

};


export const AuthService = {
    signUp,
    login,
    getMe,
    getNewToken,
    logoutUser,
    changePassword,
    verifyEmail,
    forgotPassword,
    resetPassword,
    googleLoginSuccess,
};
