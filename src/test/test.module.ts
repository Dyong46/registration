import { Module } from "@nestjs/common";
import { MicroserviceModule } from "@plogg-rely/microservices";

import { TestService } from "./test.service";
import { TestController } from "./test.controller";

@Module({
	imports: [MicroserviceModule.forRoot()],
	controllers: [TestController],
	providers: [TestService],
	exports: [TestService]
})
export class TestModule {}
