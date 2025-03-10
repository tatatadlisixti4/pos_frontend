import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Headings from "@/components/ui/Headings";
import Link from "next/link";

export default function EditProductPage() {
	return (
		<>
			<Link
				href='/admin/products?page=1'
				className="rounded bg-green-400 font-bold py-2 px-10 hover:bg-green-800 hover:text-white"
			>Volver</Link>
			<Headings>Editar Producto: {}</Headings> 
			<EditProductForm>
				<ProductForm />	
			</EditProductForm> 
		</>
	)
}
