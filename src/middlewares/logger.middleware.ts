import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req, res, next: () => void) {
		Logger.log(`${req.method} ${req.baseUrl}`, "LoggerMiddleware");
		next();
	}
}
