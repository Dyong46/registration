import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TestModule } from "./test/test.module";

describe("AppController", () => {
	let controller: AppController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [TestModule],
			controllers: [AppController],
			providers: [AppService]
		}).compile();

		controller = module.get<AppController>(AppController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
