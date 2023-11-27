import { defineStore } from "pinia";
import axios from "../utility/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    uuid:null,
    order:null,
    order_id:null,
    single_order:null
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

    // async getProduct() {
    //   try {
    //     const res = await axios.get("get-product",{
    //       headers:{
    //         "user_id":this.user_id
    //       }
    //     });
    //     this.products = res.data.products
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

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
    async getOrderData (){
      try {
        const res = await axios.get("/order",{
          headers:{
            user_id: this.uuid || null
          }
        })
        if(res.status = 200){
          this.order = res.data.order
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getSingleOrder(id){
      try {
        const res = await axios.get(`order/${id}`)
        if(res.status == 200){
          this.single_order = res.data.order
        }
      } catch (error) {
        console.log(error)
      }
    },

    async updateShippingAddress(data){
      try {
        const res = await axios.patch(`order/shipping/${this.order_id}`,{
            address:data.address,
            city:data.city,
            tole:data.tole,
            country:data.country,
            name:data.name
        })
        if(res.status == 200){
          this.single_order = res.data.order
          return res
        }
      } catch (error) {
        console.log(error)
      }
    },

    async deleteOrder(){
      try {
        const res = await axios.delete(`order/${this.order_id}`)
        if(res.status == 200){
          this.getOrderData()
        }
      } catch (error) {
        console.log(error)
      }
    },

    async updateOrderStatus(data){
      try {
        const res = await axios.patch(`order/status/${this.order_id}`,{
            order_status:data.order_status,
            payment_status:data.payment_status
        })
        if(res.status == 200){
          this.single_order = res.data.order
          this.getOrderData()
          return res
        }
      } catch (error) {
        console.log(error)
      }
    },



  },
});
