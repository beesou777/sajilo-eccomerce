import { defineStore } from "pinia";
import axios from "../utility/axios";
import Cookies from "js-cookie"
import router from "../router/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    uuid:JSON.parse(localStorage.getItem("uuid")) || null,
    user_details:JSON.parse(localStorage.getItem("user_details")) || null,
    access_token:JSON.parse(localStorage.getItem("access_token")) || null,
    // current_user_details: JSON.parse(localStorage.getItem("current_user_details")) || null,
  }),
  getters: {
    // is_user: (state) => !!state.access_token,
  },
  actions: {
    async login(data) {
      try {
        const res = await axios.post("/users/login", {
          email: data.email,
          password: data.password,
        });
        if(res.status = 200){
        this.uuid = res.data.uuid
        Cookies.set("token",res.data.access_token,{expires:7})
        localStorage.setItem("uuid",JSON.stringify(res.data.uuid))
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    },

    async getUserDetails() {
      try {
        const res = await axios.get(`/users`,{
          headers:{
            user_id:this.uuid || null
          }
        })
        if(res.status == 200){
            localStorage.setItem("user_details",JSON.stringify(res.data.user_details))
        }
    } catch (error) {
      if(error?.response?.status == 404){
          localStorage.clear()
          router.push("/login")
        }
      }
    }
    
    // async registerUser({
    //   store_name,
    //   email,
    //   full_name,
    //   profile_picture,
    // }) {
    //   try {
    //     const response = await axios.post("/createUser", {
    //       store_name,
    //       email,
    //       full_name,
    //       profile_picture,
    //     },{
    //       headers:{
    //         user_id:this.current_user_id
    //       }
    //     });
    //     if (response.status == 200) {
    //       router.push("/dashboard");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     console.log("an error occur");
    //   }
    // },
  },
});
