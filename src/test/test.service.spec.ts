import { Test, TestingModule } from "@nestjs/testing";
import { ClientModule } from "../client/client.module";
import { TestService } from "./test.service";

describe("TestService", () => {
	let service: TestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientModule],
			providers: [TestService]
		}).compile();

		service = module.get<TestService>(TestService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
