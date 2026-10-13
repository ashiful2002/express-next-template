import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { IndexRoutes } from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import { auth } from './app/lib/auth';
import { toNodeHandler } from "better-auth/node";
import path from 'node:path';
import { envVars } from './app/config/env';

const app: Application = express();


app.set("view engine", "ejs")
app.set("views", path.resolve(process.cwd(), `src/app/templates`))

//Better auth routes
app.use("/api/auth", toNodeHandler(auth))

// parsers
app.use(express.json());
app.use(cors({
  origin: [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser());

// application routes
app.use('/api/v1', IndexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Template express app by mukto');
});

app.use(globalErrorHandler)
app.use(notFound)


export default app;
