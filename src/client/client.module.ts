import { HttpModule, Module } from "@nestjs/common";
import { ClientService } from "./client.service";

@Module({
	imports: [HttpModule],
	providers: [ClientService],
	exports: [ClientService]
})
export class ClientModule {}
