import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export const validateRequest = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if ('shape' in schema && (schema as unknown as { shape: Record<string, unknown> }).shape.body) {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    cookies: req.cookies,
                });
            } else {
                await schema.parseAsync(req.body);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

