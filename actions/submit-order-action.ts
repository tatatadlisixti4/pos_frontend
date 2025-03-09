"use server";
import {
	ErrorResponseSchema,
	OrderSchema,
	SuccessResponseSchema,
} from "@/src/schemas";
import { revalidateTag } from "next/cache";

type ActionStateType = {
	errors: string[];
	success: string;
};

export async function submitOrder(data: unknown) {
	const order = OrderSchema.parse(data);
	const url = `${process.env.API_URL}/transactions`;

	const req = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...order }),
	});
	const json = await req.json();

	if (!req.ok) {
		const errors = ErrorResponseSchema.parse(json);
		return {
			errors: errors.message.map((issue) => issue),
			success: "",
		};
	}
	const success = SuccessResponseSchema.parse(json);
	// revalidatePath('/(store)/[categoryId]', 'page');
	revalidateTag('products-by-category');
	return {
		errors: [],
		success: success.message,
	};
}
