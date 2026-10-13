export interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

// {
//     session: {
//         id: string;
//         createdAt: Date;
//         updatedAt: Date;
//         userId: string;
//         expiresAt: Date;
//         token: string;
//         ipAddress?: string | null | undefined;
//         userAgent?: string | null | undefined;
//     };
//     user: {
//         id: string;
//         createdAt: Date;
//         updatedAt: Date;
//         email: string;
//         emailVerified: boolean;
//         name: string;
//         image?: string | null | undefined;
//         role: string;
//         status: string;
//         needPasswordChange: boolean;
//         isDeleted: boolean;
//         deletedAt?: Date | null | undefined;
//     };
// } | null

export interface ISession {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    role: string;
    status: string;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt?: Date | null | undefined;
  };
}  