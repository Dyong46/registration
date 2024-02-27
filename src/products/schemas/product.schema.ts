import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import {
	IsDate,
	IsEmail,
	IsObject,
	IsOptional,
	IsPhoneNumber,
	IsString,
	Length
} from "class-validator";

import { DocumentSchema } from "../../microservices/document/schemas/document.schema";
import { Transformers } from "../../microservices/helpers/transformers";
import { DataObject } from "../../microservices/message.dto";
import { Contract } from "../dto/contract.dto";

@Schema({ timestamps: true })
export class Product extends DocumentSchema {
	@Prop({ type: String })
	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	email: string;

	@Prop({ type: String })
	@IsString()
	@Length(2, 16)
	firstName: string;

	@Prop({ type: String })
	@IsString()
	@Length(2, 16)
	lastName: string;

	@Prop({ type: String, transformer: Transformers.Phone })
	@IsPhoneNumber("US")
	phone: string;

	@Prop({ type: Date })
	@Type(() => Date)
	@IsDate()
	birthDay: Date;

	@Prop({ type: Date })
	@Type(() => Date)
	@IsDate()
	registeredDate: Date;

	@Prop({ type: Date, default: null })
	@Type(() => Date)
	@IsDate()
	expirationDate: Date;

	@Prop({ type: Contract })
	@IsOptional()
	contract?: Contract;

	@Prop({ type: Object })
	@IsObject()
	@IsOptional()
	uniques?: DataObject;

	@Prop({ type: Object })
	@IsObject()
	@IsOptional()
	properties?: DataObject;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index(
	{ scope: 1, phone: 1, uniques: 1 },
	{
		unique: true
	}
);
