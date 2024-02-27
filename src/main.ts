import * as Package from "../package.json";

import { AppModule } from "./app.module";
import { bootstrap } from "./microservices/app";

bootstrap(AppModule, {
	title: "Registration Service",
	description: "Registration service API used as a template on Github.",
	version: Package.version
});
