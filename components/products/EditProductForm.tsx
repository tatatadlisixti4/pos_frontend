"use client"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Product } from "@/src/schemas";
import { editProduct } from "@/actions/edit-product-action";

export default function EditProductForm({ children, productId }: { children: React.ReactNode, productId: Product['id'] }) {
	const router = useRouter();
	const editProductWithId = editProduct.bind(null, productId);
	const [state, dispatch] = useActionState(editProductWithId, {
		errors: [],
		success: ''
	});
	useEffect(() => {
		if (state.errors) {
			state.errors.forEach(error => toast.error(error));
		}
		if (state.success) {
			toast.success(state.success);
			router.push('/admin/products');
		}
	}, [state])
	return (
		<form
			className="space-y-5"
			action={dispatch}
		>
			{children}
			<input
				type="submit"
				className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer hover:bg-green-800 hover:text-white"
				value="Guardar Cambios"
			/>
		</form>
	)
}
