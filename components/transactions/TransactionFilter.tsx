'use client'
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from 'date-fns';
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "./TransactionSummary";
/** Type para React Calendar según documentación */
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
	const [date, setDate] = useState<Value>(new Date());
	const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd');
	const { data, isLoading } = useQuery({
		queryKey: ['sales', formattedDate],
		queryFn: () => getSalesByDate(formattedDate)
	});

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
			<div>
				<Calendar
					value={date}
					onChange={setDate}
				/>
			</div>

			<div>
				{isLoading && 'Cargando...'}
				{data ? data.length ? data.map(transaction => (
					<TransactionSummary
						key={transaction.id}
						transaction={transaction}
					/>
				)) : <p className="text-lg text-center">No hay ventas en esta fecha</p> : null}
			</div>
		</div>

	)
}
