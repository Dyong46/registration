import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { TestModule } from "./test/test.module";

describe("AppService", () => {
	let service: AppService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [TestModule],
			providers: [AppService]
		}).compile();

		service = module.get<AppService>(AppService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
