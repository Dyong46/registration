import { Controller, Post, Body } from "@nestjs/common";
import { Message } from "../message.interface";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	create(@Body() message: Message) {
		return this.messagesService.receive(message);
	}
}
