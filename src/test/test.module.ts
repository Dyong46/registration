import { Module } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { ClientModule } from "../client/client.module";

@Module({
	imports: [ClientModule],
	controllers: [TestController],
	providers: [TestService],
	exports: [TestService]
})
export class TestModule {}
