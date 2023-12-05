import { defineStore } from "pinia";
import axios from "../utility/axios";
import router from "../router/router";

export const useHomepageStore = defineStore("homepage", {
  state: () => ({
   homepageData:null
  }),
  actions: {
    async getHomepageBanner (){
      try {
        const res = await axios.get(`/homepage-banner`,{
          headers:{
            // user_id:this.uuid || null,
            url:window.location.pathname
          }
        })
        if(res.status = 200){
          this.homepageData = res.data.banner
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
});
