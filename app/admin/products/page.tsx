import ProductsTable from "@/components/products/ProductsTable";
import Headings from "@/components/ui/Headings";
import { ProductResponseSchema } from "@/src/schemas";

async function getProducts() {
	// ?take=1&skip=2
	const url = `${process.env.API_URL}/products`;
	const req = await fetch(url);
	const json = await req.json();
	const data = ProductResponseSchema.parse(json);
	return {
		products: data.products,
		total: data.total
	};
}

export default async function ProductsPage() {
	const {products, total} = await getProducts();
	return (
		<>
			<Headings>Administrar Productos</Headings>

			<ProductsTable
				products={products}
			/>
		</>
	)
}
