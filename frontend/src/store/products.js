import { defineStore } from "pinia";
import axios from "../utility/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    categories: null,
    current_user_id: JSON.parse(localStorage.getItem("user_id")) || null,
    category_id: null,
    access_token: JSON.parse(localStorage.getItem("access_token")) || null,
    products:null,
    user_id: JSON.parse(localStorage.getItem("current_user_details")).user_details._id || "",
  }),
  actions: {

    async createCategories(formdata) {
      try {
        const res = await axios.post(`/create-category`, formdata, {
          headers: {
            access_token: this.access_token,
            user_id:this.user_id
          },
        });
        if (res.status == 200) {
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getCategories() {
      try {
        const res = await axios.get(`/get-category/${this.user_id}`);
        if (res.status == 200) {
          this.categories = res.data.categories;
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
            "access_token": this.access_token,
            "user_id":this.user_id
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
            "user_id":this.user_id
          }
        });
        this.products = res.data.products
      } catch (error) {
        console.log(error);
      }
    },
  },
});
