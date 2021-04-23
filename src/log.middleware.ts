import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
	private readonly logger = new Logger("LogMiddleware");

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log(`${req.method} ${req.baseUrl || "/"}`);
		next();
	}
}
