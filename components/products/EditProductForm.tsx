"use client"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function EditProductForm({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	

	return (
		<form
			className="space-y-5"
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
