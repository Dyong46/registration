import { Controller, Post, Body, UseFilters } from "@nestjs/common";
import { MessageDto, QueryExceptionFilter } from "@plogg-rely/microservices";

import { TestService } from "./test.service";

@Controller("test")
@UseFilters(QueryExceptionFilter)
export class TestController {
	constructor(private readonly testService: TestService) {}

	@Post()
	test(@Body() message: MessageDto) {
		return this.testService.test(message);
	}
}
