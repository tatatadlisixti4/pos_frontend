import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Headings from "@/components/ui/Headings";
import Link from "next/link";

export default function NewProductPage() {
	return (
		<>
			<Link
				href={'/admin/products?page=1'}
				className="rounded bg-green-400 font-bold py-2 px-10 hover:bg-green-800 hover:text-white"
			>Productos</Link>
			<Headings>Nuevo Producto</Headings>
			<AddProductForm>
				<ProductForm />
			</AddProductForm>
		</>
	)
}
