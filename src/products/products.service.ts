import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { DocumentService } from "../microservices/document/document.service";
import { MicroserviceService } from "../microservices/microservice/microservice.service";

import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductsService extends DocumentService<Product> {
	constructor(
		@InjectModel(Product.name) model: Model<Product>,
		private readonly notifyServices: NotificationsService,
		private readonly microservices: MicroserviceService
	) {
		super(model);
	}
}
