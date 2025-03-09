"use client"
import { useStore } from '@/src/store';
import ShoppingCartItem from './ShoppingCartItem';
import Amount from './Amount';
import CouponForm from './CouponForm';
import SubmitOrderForm from './SubmitOrderForm';

export default function ShoppinCart() {
	const contents = useStore(state => state.contents); 
	const total = useStore(state => state.total); 
	const discount = useStore(state => state.discount); 
	return (
		<>
			{contents.length ? (
				<>
					<h2 className="text-4xl font-bold text-gray-900">Resumen de Venta</h2>
					<ul 
						role='list'
						className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
					>
						{contents.map(item => (
							<ShoppingCartItem
								key={item.productId}
								item={item}
							/>
						))}
					</ul>
					<dl className='space-y-5 border-t border-gray-300 py-6 text-sm font-medium text-gray-500'>
						{discount ? (
							<Amount 
								label="Descuento"
								amount={discount}
								discount={true}
							/>
						) : null}
						<Amount 
							label="Total a Pagar"
							amount={total}
							discount={false}
						/>
					</dl>
					<CouponForm />
					<SubmitOrderForm />
				</>
			) : (
				<p className='text-xl mt-5 text-gray-900 text-center font-bold'>Añade elementos al carrito.</p>
			)}
		</>
	)
}
