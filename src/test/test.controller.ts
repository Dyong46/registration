import { Controller, Post, Body } from "@nestjs/common";
import { Message } from "../message.interface";
import { TestService } from "./test.service";

@Controller("test")
export class TestController {
	constructor(private readonly testService: TestService) {}

	@Post()
	test(@Body() message: Message) {
		return this.testService.test(message);
	}
}
