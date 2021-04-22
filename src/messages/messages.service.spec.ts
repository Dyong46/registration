import { Test, TestingModule } from "@nestjs/testing";
import { ClientModule } from "../client/client.module";
import { MessagesService } from "./messages.service";

describe("MessagesService", () => {
	let service: MessagesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientModule],
			providers: [MessagesService]
		}).compile();

		service = module.get<MessagesService>(MessagesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
