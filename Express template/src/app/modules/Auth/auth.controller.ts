import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";
import { tokenUtils } from "../../utils/token";
import { CookieUtils } from "../../utils/cookie";
import AppError from "../../errorHelpers/appError";
import { envVars } from "../../config/env";
import { auth } from "../../lib/auth";
import { ISession } from "../../interfaces";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  // here we can see the passward :XD
  // console.log(payload, "from controller");

  const result = await AuthService.signUp(
    payload,
    req.headers as Record<string, string>
  );

  const { accessToken, refreshToken, token, user } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: {
      user,
      token,
      accessToken,
      refreshToken,
    },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.login(payload);

  const { accessToken, refreshToken, token, user } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      user,
      token,
      accessToken,
      refreshToken,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  // console.log(user, "controller");
  const result = await AuthService.getMe(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.logoutUser(betterAuthSessionToken);
  const isProduction = envVars.NODE_ENV === "production";
  CookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });
  CookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });
  CookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
  });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];

  if (!refreshToken) {
    throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
  }

  const result = await AuthService.getNewToken(
    refreshToken,
    betterAuthSessionToken
  );

  const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken,
    },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.changePassword(
    payload,
    betterAuthSessionToken
  );

  const { accessToken, refreshToken, token } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: { ...result, accessToken, refreshToken },
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await AuthService.verifyEmail(email, otp);

  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  if (token) {
    tokenUtils.setBetterAuthSessionCookie(res, token);
  }

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Email verified successfully",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthService.forgotPassword(email);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Forgot password email sent successfully",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  const result = await AuthService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const redirectPath = req.query.redirectPath || "/dashboard";
  const encodedRediredtPath = encodeURIComponent(redirectPath as string);

  const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/callback?redirectPath=${encodedRediredtPath}`;

  res.render("googleRedirect", {
    callbackURL: callbackURL,
    betterAuthUrl: envVars.BETTER_AUTH_URL,
  });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  const redirectPath = (req.query.redirectPath as string) || "/dashboard";

  const sessionToken = req.cookies["better-auth.session_token"];

  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/sign-in?error=oauth_failed`);
  }
  const session = await auth.api.getSession({
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`,
    },
  });
  if (session && !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/sign-in?error=no_user_found`);
  }

  if (!session) {
    return res.redirect(`${envVars.FRONTEND_URL}/sign-in?error=no_session_found`);
  }
  const result = await AuthService.googleLoginSuccess(session as ISession);

  const { accessToken, refreshToken } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  const isValidRedirectPath =
    redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";

  res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});

const handleOAuthError = catchAsync(async (req: Request, res: Response) => {
  const error = (req.query.error as string) || "oauth_failed";
  res.redirect(`${envVars.FRONTEND_URL}/sign-in?error=${error}`);
});

export const AuthController = {
  signUp,
  login,
  getMe,
  logoutUser,
  getNewToken,
  changePassword,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin,
  googleLoginSuccess,
  handleOAuthError,
};
