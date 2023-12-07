import { defineStore } from "pinia";
import axios from "../utility/axios";
import router from "../router/router";

export const useHomepageStore = defineStore("homepage", {
  state: () => ({
  uuid:null,
   homepageData:null,
   homepageSection:null,
   url:null
  }),
  actions: {
    async getHomepageBanner (){
      try {
         if(!window.location.pathname.startsWith("/dashboard")){
          this.url = window.location.pathname
        }
        const res = await axios.get(`/homepage-banner`,{
          headers:{
            user_id:this.uuid || null,
            url:this.url
          }
        })
        if(res.status = 200){
          this.homepageData = res.data.banner
        }
      } catch (error) {
        console.log(error)
      }
    },
    async updateHomepageBannerData(formdata){
      try {
        const res = await axios.patch(`/homepage-banner/${this.homepageData._id}`,formdata)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async getHomepageSection (){
      try {
        if(!window.location.pathname.startsWith("/dashboard")){
          this.url = window.location.pathname
        }
        const res = await axios.get(`/homepage-section`,{
          headers:{
            user_id:this.uuid || null,
            url:this.url
          }
        })
        if(res.status = 200){
          this.homepageSection = res.data.sections
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
});