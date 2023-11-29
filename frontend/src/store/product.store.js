import { defineStore } from "pinia";
import axios from "../utility/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    uuid:null,
    product:null,
    product_id:null,
    single_product:null
  }),
  actions: {

    // async createCategories(formdata) {
    //   try {
    //     const res = await axios.post(`/create-category`, formdata, {
    //       headers: {
    //         access_token: this.access_token,
    //         user_id:this.user_id
    //       },
    //     });
    //     if (res.status == 200) {
    //       return res;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // async getCategories() {
    //   try {
    //     const res = await axios.get(`/get-category/${this.user_id}`);
    //     if (res.status == 200) {
    //       this.categories = res.data.categories;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // async deleteCategories(currentIndex) {
    //   try {
    //     console.log(currentIndex);
    //     const res = await axios.delete(`/delete-category/${currentIndex}`, {
    //       headers: {
    //         access_token: this.access_token,
    //       },
    //     });
    //     if (res.status == 200) {
    //       this.getCategories();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // async editCategories(formdata) {
    //   try {
    //     await axios.patch(`/edit-category/${this.category_id}`, formdata, {
    //       headers: {
    //         access_token: this.access_token,
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     this.getCategories();
    //   }
    // },

    // async createProduct(formdata) {
    //   try {
    //     const res = await axios.post("/create-product", formdata, {
    //       headers: {
    //         "access_token": this.access_token,
    //         "user_id":this.user_id
    //       },
    //     });
    //     console.log(res.data.message);
    //   } catch (error) {
    //     console.log(error?.response?.data?.message);
    //   } finally {
    //     await this.getProduct()
    //   }
    // },

    async getProduct() {
      try {
        const res = await axios.get("product",{
          headers:{
            user_id:this.uuid
          }
        });
       if(res.status == 200){
        this.product = res.data.products
       }
      } catch (error) {
        console.log(error);
      }
    },

    // async getSubDomainProduct(){
    //   const sub_domain = window.location.pathname.replace("/","").split("/")[0]
    //   const res = await axios.get(`owner-product/${sub_domain}`)
    //   console.log(res)
    // },

    // async editHomepageBanner(formdata){
    //   console.log(this.homepageBanner._id)
    //   try {
    //     const req = await axios.patch(`/homepage-banner/${this.homepageBanner._id}`, formdata, {
    //       headers: {
    //         access_token: this.access_token,
    //       },
    //     });
    //     if(req.status == 200){
    //       this.getHomepageBanner()
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     this.getCategories();
    //   }
    // },
    // async getHomepageBanner(){
    //   try {
    //     const res = await axios.get(`/homepage-banner`, {
    //       headers: {
    //         access_token: this.access_token,
    //         user_id:this.user_id
    //       },
    //     });
    //     this.homepageBanner = res.data.banner
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     this.getCategories();
    //   }
    // },

    // async getHomepageSection(){
    //   try {
    //     const res = await axios.get(`/homepage-section`, {
    //       headers: {
    //         access_token: this.access_token,
    //         user_id:this.user_id
    //       },
    //     });
    //     this.homepage_section = res.data.sections
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     this.getCategories();
    //   }
    // }

 



  },
});
