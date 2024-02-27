import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { DocumentController } from "../microservices/document/document.controller";
import { QueryExceptionFilter } from "../microservices/query-exception.filter";

import { ProductsService } from "./products.service"; 

const name = "members";

@ApiTags(name)
@Controller(name)
@UseFilters(QueryExceptionFilter)
export class ProductsController extends DocumentController {
	constructor(private readonly productsService: ProductsService) {
		super(productsService);
	}
}
