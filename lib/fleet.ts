import { appConfig } from "@/lib/app-config";
import type { AppConfig } from "@/lib/zod";

export type Product = AppConfig["projects"][number];
export type ProductStatus = Product["status"];
export type ProductCategory = Product["category"];

/** Store shelves, in display order. Products keep their order from app-config. */
export const CATEGORY_ORDER = [
	"server",
	"harness",
	"ade",
	"desktop",
	"app",
	"kit",
] as const satisfies readonly ProductCategory[];

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
	server: "Servers",
	harness: "Harness",
	ade: "ADE",
	desktop: "Desktop",
	app: "Apps",
	kit: "Developer kits",
};

export function getFleet() {
	const products = appConfig.projects;
	const shelves = CATEGORY_ORDER.map((category) => ({
		category,
		products: products.filter((product) => product.category === category),
	})).filter((shelf) => shelf.products.length > 0);

	return { products, shelves };
}
