import TransactionFilter from "@/components/transactions/TransactionFilter";
import Headings from "@/components/ui/Headings";
import { getSalesByDate } from "@/src/api";
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { format } from "date-fns";

export default async function SalesPage() {
	const queryClient = new QueryClient();
	const today = new Date();
	const formattedDate = format(today, 'yyyy-MM-dd');
	
	await queryClient.prefetchQuery({
		queryKey: ['sales', formattedDate], // Arreglo de valores para identificar la consulta, no sigue una sintaxis en especial, es lo que quieras poner en el array
		queryFn: () => getSalesByDate(formattedDate)
	})

	return (
		<>
			<Headings>Ventas</Headings>
			<p className="text-lg">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha.</p>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<TransactionFilter />
			</HydrationBoundary>
		</>
	)
}
