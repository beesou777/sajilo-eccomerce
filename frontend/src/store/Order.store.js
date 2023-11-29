import { defineStore } from "pinia";
import axios from "../utility/axios";
import router from "../router/router";

export const useOrderStore = defineStore("order", {
  state: () => ({
    uuid:null,
    order:null,
    order_id:null,
    single_order:null
  }),
  actions: {
    async createOrder(data){
      try {
        const res = await axios.post('/order/create',{
          orderItems:data.orderItems,
          customer_details:data.customer_details
        },{
          headers:{
            user_id: this.uuid || null
          }
        })
        if(res.status == 200){
          router.push("/dashboard/order")
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getOrderData (searchQuery){
      try {
        const res = await axios.get(`/order?search=${searchQuery}`,{
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
            name:data.name,
            phone:data.phone,
            email:data.email
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
          this.getOrderData('')
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
          this.getOrderData('')
          return res
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
});
