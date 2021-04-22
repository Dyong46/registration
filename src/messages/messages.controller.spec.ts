import { Test, TestingModule } from "@nestjs/testing";
import { ClientModule } from "../client/client.module";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

describe("MessagesController", () => {
	let controller: MessagesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientModule],
			controllers: [MessagesController],
			providers: [MessagesService]
		}).compile();

		controller = module.get<MessagesController>(MessagesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
