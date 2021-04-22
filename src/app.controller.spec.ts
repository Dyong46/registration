import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientModule } from "./client/client.module";

describe("AppController", () => {
	let controller: AppController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientModule],
			controllers: [AppController],
			providers: [AppService]
		}).compile();

		controller = module.get<AppController>(AppController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
