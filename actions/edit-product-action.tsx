"use server"
import { ErrorResponseSchema, Product, ProductFormSchema, SuccessResponseSchema } from "@/src/schemas";

type ActionStateType = {
	errors: string[];
	success: string;
}

export async function editProduct(productId: Product['id'], prevState: ActionStateType, formData: FormData) {
	const product = ProductFormSchema.safeParse({
		name: formData.get('name'),
		price: formData.get('price'),
		inventory: formData.get('inventory'),
		categoryId: formData.get('categoryId'),
	});
	if (!product.success) {
		return {
			errors: product.error.issues.map(issue => issue.message),
			success: prevState.success,
		}
	}
	const url = `${process.env.API_URL}/products/${productId}`;

	const req = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(product.data),
	});
	const json = await req.json();
	
	if (!req.ok) {
		const errors = ErrorResponseSchema.parse(json);
		return {
			errors: errors.message.map(error => error),
			success: prevState.success
		}
	}
	

	return {
		errors: prevState.errors,
		success: "Producto Actualizado Correctamente"
	}
}