import * as fs from "fs";

export default null;
const path = "./src/migrations";

fs.readdirSync(path).forEach(async file => {
	if (file.match(/\.ts$/) && file != "index.ts") {
		const fn = file.replace(/\.ts$/, "");
		exports[fn] = await import(`./${fn}.js`);
	}
});
