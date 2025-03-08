import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, ShoppingCart } from "./schemas";
interface Store {
	total: number;
	contents: ShoppingCart;
	addToCart: (product: Product) => void;
}

export const useStore = create<Store>()(
	devtools((set, get) => ({
		total: 0,
		contents: [],
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
			}));
		},
	}))
);
			
			
