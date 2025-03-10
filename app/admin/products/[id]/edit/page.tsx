import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Headings from "@/components/ui/Headings";
import { ProductSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getProduct (id : string) {
	const url = `${process.env.API_URL}/products/${id}`
	const req = await fetch(url);
	const json = await req.json();
	//if(!req.ok) redirect ('/admin/products?page=1');
	if(!req.ok) notFound();
	const product = ProductSchema.parse(json);
	return product;
}
type Params = Promise<{id: string}>

export default async function EditProductPage({params}: {params: Params}) {
	const {id} = await params;
	if (!isValidPage(+id)) redirect('/admin/products?page=1');
	const product = await getProduct(id);
	return (
		<>
			<Link
				href='/admin/products?page=1'
				className="rounded bg-green-400 font-bold py-2 px-10 hover:bg-green-800 hover:text-white"
			>Volver</Link>
			<Headings>Editar Producto: {product.name}</Headings> 
			<EditProductForm
				productId={product.id}
			>
				<ProductForm product={product} />	
			</EditProductForm> 
		</>
	)
}
