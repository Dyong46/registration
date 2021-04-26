import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MicroserviceModule } from "@plogg-rely/microservices";

import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import Test from "./entities/test.entity";

@Module({
	imports: [MicroserviceModule.forRoot()],
	controllers: [TestController],
	providers: [TestService],
	exports: [TestService]
})
export class TestModule {}
