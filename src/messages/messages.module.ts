import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { ClientModule } from "../client/client.module";

@Module({
	imports: [ClientModule],
	controllers: [MessagesController],
	providers: [MessagesService],
	exports: [MessagesService]
})
export class MessagesModule {}
