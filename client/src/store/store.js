import create from 'zustand';
import { persist } from 'zustand/middleware';


const useUserStore = create(persist((set) => ({
    loggedInUser: null,
    setLoggedInUser: (user) => set({ loggedInUser: user }),
    logout: () => set({ loggedInUser: null }),
}),
{
    name: 'user-storage',
    getStorage: () => sessionStorage,
    onRehydrateStorage: (set, state) => state && set({ loggedInUser: state.loggedInUser }),
}
));

const useCartStore = create(persist((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existingProduct = state.cart.find((p) => p._id === product._id);
        console.log("existingProduct", existingProduct);
        if (existingProduct) {
            // If product already exists, update the quantity
            const updatedCart = state.cart.map((p) =>
                p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
            );

            return { cart: updatedCart };
        } else {
            // If product does not exist, add it to the cart
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }
    }),
    removeFromCart: (product) => set((state) => {
        const existingProduct = state.cart.find((p) => p._id === product._id);

        if (existingProduct && existingProduct.quantity === 1) {
            // If product already exists and quantity is 1, remove it from the cart
            const updatedCart = state.cart.filter((p) => p._id !== product._id);

            return { cart: updatedCart };
        } else if (existingProduct) {
            // If product already exists and quantity is > 1, update the quantity
            const updatedCart = state.cart.map((p) =>
                p._id === product._id ? { ...p, quantity: p.quantity - 1 } : p
            );

            return { cart: updatedCart };
        } else {
            // If product does not exist, do nothing
            return;
        }
    }),

    clearCart: () => set({ cart: [] }),
}),
{
    name: 'cart-storage',
    getStorage: () => sessionStorage,
    onRehydrateStorage: (set, state) => state && set({ cart: state.cart }),
}
));



export { useUserStore, useCartStore };
