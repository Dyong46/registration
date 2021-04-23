import { Test, TestingModule } from "@nestjs/testing";
import { MicroserviceModule } from "@plogg-rely/microservices";

import { TestController } from "./test.controller";
import { TestService } from "./test.service";

describe("TestController", () => {
	let controller: TestController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MicroserviceModule.forRoot({})],
			controllers: [TestController],
			providers: [TestService]
		}).compile();

		controller = module.get<TestController>(TestController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
