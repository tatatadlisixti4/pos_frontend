import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Coupon, CouponResponeSchema, Product, ShoppingCart } from "./schemas";
interface Store {
	total: number;
	discount: number;
	contents: ShoppingCart;
	coupon: Coupon;
	addToCart: (product: Product) => void;
	updateQuantity: (id: Product['id'], quantity: number) => void;
	deleteItem: (id: Product['id']) => void;
	calculateTotal: () => void;
	applyCoupon: (couponName: string) => Promise<void>;
	applyDiscount: () => void;
	clearOrder: () => void;
}

const initialState = {
	total: 0,
	discount: 0,
	contents: [],
	coupon: {
		name: '',
		message: '',
		percentage: 0
	},
}

export const useStore = create<Store>()(
	devtools((set, get) => ({
		...initialState,
		calculateTotal: () => {
			const total = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);
			set(() => ({
				total
			}));
			if(get().discount > 0) get().applyDiscount(); //TODO: cambiar condicion a percentage si no funciona discount
		},
		addToCart: (product) => {
			const { id: productId, categoryId, ...data } = product;
			let contents: ShoppingCart = [];
			const duplicated = get().contents.findIndex(item => item.productId === productId);
			if(duplicated >= 0) {
				if( get().contents[duplicated].quantity >= get().contents[duplicated].inventory ) return;
				contents = get().contents.map(item => 
					item.productId === productId ? {
						...item, 
						quantity: item.quantity + 1 
					} : item 
				);				
			} else {
				contents = [
					...get().contents, {
						...data,
						productId,
						quantity: 1,
					},
				];
			}
			set(() => ({
				contents,
			}));//TODO: cambiar condicion a percentage si no funciona discount
			get().calculateTotal();
		},
		updateQuantity: (id, quantity) => {
			set(state => ({
				contents : state.contents.map(item => item.productId === id ? {...item, quantity} : item)
			}));
			get().calculateTotal();
		},
		deleteItem: id => {
			set(state => ({
				contents: state.contents.filter(item => item.productId !== id)
			}));
			get().calculateTotal();
			if(get().contents.length === 0) get().clearOrder();
		},
		applyCoupon: async (couponName) => {
			const req = await fetch('/coupons/api', {
				method: 'POST',
				body: JSON.stringify({
					coupon_name: couponName
				})
			});
			const json = await req.json();
			const coupon = CouponResponeSchema.parse(json);
			set(() => ({
				coupon
			}));
			if(coupon.percentage) get().applyDiscount(); //TODO: cambiar condicion a percentage si no funciona discount
		},
		applyDiscount: () => {
			const subTotalAmount = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);
			const discount = (get().coupon.percentage / 100) * subTotalAmount;
			const total = subTotalAmount - discount;
			set(() => ({
				total,
				discount
			})); 
		},
		clearOrder: () => {
			set(() => ({
				...initialState
			}));
		}
	}))
);
			
	