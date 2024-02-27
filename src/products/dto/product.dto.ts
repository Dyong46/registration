import { Transform, Type } from "class-transformer";
import {
	IsDate,
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MinLength,
	ValidateNested
} from "class-validator";

import { MessageDto } from "../../microservices/message.dto";

const MIN_LENGTH = 3;

export class ProductInfoDto {
	@IsString()
	firstName: string;

	@IsString()
	@MinLength(MIN_LENGTH)
	lastName: string;

	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	email: string;

	@IsPhoneNumber("US")
	phone: string;

	@Type(() => Date)
	@IsDate()
	@IsOptional()
	birthDay: Date;

	@Type(() => Date)
	@IsDate()
	@IsOptional()
	registeredDate: Date = new Date();
}

export class ProductDto extends MessageDto {
	@IsString()
	scope: string;

	@ValidateNested({ each: true })
	@Type(() => ProductInfoDto)
	data: ProductInfoDto;
}
