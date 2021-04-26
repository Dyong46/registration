import { Test, TestingModule } from "@nestjs/testing";
import { MicroserviceModule } from "@plogg-rely/microservices";

import { TestService } from "./test.service";

describe("TestService", () => {
	let service: TestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MicroserviceModule.forRoot()],
			providers: [TestService]
		}).compile();

		service = module.get<TestService>(TestService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
