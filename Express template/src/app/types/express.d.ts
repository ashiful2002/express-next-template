import { UserRole } from '../../generated/prisma/enums';

declare global {
  type IRequestUser = {
    userId: string;
    role: UserRole;
    email: string;
  };

  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}
