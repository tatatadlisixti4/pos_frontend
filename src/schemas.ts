import { z } from "zod";

export const CategorySchema = z.object({
	id: z.number(),
	name: z.string(),
});

export const CategoriesSchema = z.array(CategorySchema);

export const ProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string(),
	price: z.coerce.number(),
	inventory: z.number(),
	categoryId: z.number(),
});

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
	products: z.array(ProductSchema),
});


export type Product = z.infer<typeof ProductSchema>;


