import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: [],
    };
  },
  actions: {
    addToCart(id, quantity) {
      this.cart.push({ id, quantity });
    },

    updateCartQuantity(id, quantity) {
      let index = this.cart.findIndex((element) => {
        return element?.id === id;
      });

      if (index !== -1) {
        this.cart[index].quantity = this.cart[index]?.quantity + quantity;
      } else {
        this.addToCart(id, quantity);
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((element) => {
        return element?.id !== id;
      });
    },
  },
  persist: true,
});
