import * as crypto from "crypto";

export const generateRandomCode = (length = 6, type: string): string => {
	switch (type) {
		case "digits":
			const randomString = crypto.randomBytes(32).toString("hex");

			return randomString.slice(-length).toUpperCase();

		default:
			return Math.random()
				.toString()
				.slice(2, 2 + length);
	}
};
export const generateUniqueCode = async (
	callback,
	type = "digits"
): Promise<string> => {
	let isCodeUnique = false;
	let code: string;

	while (!isCodeUnique) {
		code = generateRandomCode(6, type);

		const existingBooking = await callback(code);

		if (!existingBooking) {
			isCodeUnique = true;
		}
	}

	return code;
};
