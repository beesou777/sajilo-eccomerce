import { defineStore } from "pinia";
import axios from "../utility/axios";
import { useAuthStore } from "./authentication";

export const useProductStore = defineStore("product", {
  state: () => ({
    categories: null,
    current_user_id: JSON.parse(localStorage.getItem("user_id")) || null,
    category_id: null,
    access_token: JSON.parse(localStorage.getItem("access_token")) || null,
    products:null,
  }),
  actions: {
    async getCategories() {
      try {
        const res = await axios.get(`/get-category`, {
          headers: {
            "user-id": this.current_user_id,
          },
        });
        if (res.status == 200) {
          this.categories = res.data.categories;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async createCategories(formdata) {
      try {
        const res = await axios.post(`/create-category`, formdata, {
          headers: {
            access_token: this.access_token,
          },
        });
        if (res.status == 200) {
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCategories(currentIndex) {
      try {
        console.log(currentIndex);
        const res = await axios.delete(`/delete-category/${currentIndex}`, {
          headers: {
            access_token: this.access_token,
          },
        });
        if (res.status == 200) {
          this.getCategories();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async editCategories(formdata) {
      try {
        await axios.patch(`/edit-category/${this.category_id}`, formdata, {
          headers: {
            access_token: this.access_token,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.getCategories();
      }
    },

    async createProduct(formdata) {
      try {
        const res = await axios.post("/create-product", formdata, {
          headers: {
            "access-token": this.access_token,
          },
        });
        console.log(res.data.message);
      } catch (error) {
        console.log(error?.response?.data?.message);
      } finally {
        await this.getProduct()
      }
    },

    async getProduct() {
      try {
        const res = await axios.get("get-product",{
          headers:{
            "user-id":this.current_user_id
          }
        });
        this.products = res.data.products
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
