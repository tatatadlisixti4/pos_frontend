import { z } from "zod";
/** SCHEMAS */
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

/** Shoppping Cart */
const ShopppingCartContentsSchema = ProductSchema.pick({
	name: true,
	image: true,
	price: true,
	inventory: true,
}).extend({
	productId: z.number(),
	quantity: z.number(),
});

const ShoppingCartSchema = z.array(ShopppingCartContentsSchema);

/** TYPES */
export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShopppingCartContentsSchema >
