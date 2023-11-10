import { defineStore } from "pinia";
import axios from "../utility/axios";
import { googleTokenLogin } from "vue3-google-login";
import router from "../router/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    current_user_id:JSON.parse(localStorage.getItem("user_id")) || null,
    access_token:JSON.parse(localStorage.getItem("access_token")) || null,
    current_user_details: JSON.parse(localStorage.getItem("current_user_details")) || null,
  }),
  getters: {
    is_user: (state) => !!state.access_token,
  },
  actions: {
    async login() {
      try {
        googleTokenLogin().then((response) => {
          if (response) {
           localStorage.setItem("access_token",JSON.stringify(response.access_token))
           this.access_token = response.access_token;
           axios.defaults.headers.common['Authorization'] = `Bearer ${this.access_token}`
          }
        });
      } catch (error) {
        console.log("Login Failed!!");
      }
    },
    async getUserData() {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        );
        if (response.data) {
          const data = {
            email: response.data.email,
            full_name: response.data.name,
            profile_picture: response.data.picture,
            id: response.data.id,
          };
          this.current_user_id = data.id
          localStorage.setItem("user_id",JSON.stringify(response.data.id))
          return data;
        }
      } catch (error) {
        console.log(error?.response?.data?.error?.status);
      }
    },
    
    async registerUser({
      store_name,
      email,
      full_name,
      profile_picture,
    }) {
      try {
        const response = await axios.post("/createUser", {
          store_name,
          email,
          full_name,
          profile_picture,
        },{
          headers:{
            user_id:this.current_user_id
          }
        });
        if (response.status == 200) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
        console.log("an error occur");
      }
    },

    async getUserInfomation() {
      try {
        if (this.is_user) {
          const res = await axios.get(`/getUser/${this.current_user_id}`,{
            headers:{
              Authorization: `Bearer ${this.access_token}`,
              "access_token":this.access_token
            }
          });
          if (res.status == 200) {
            this.current_user_details = res.data;
           localStorage.setItem("current_user_details",JSON.stringify(res.data))
          }
        }
      } catch (error) {
        if(error?.response?.data.message == "User does not found"){
          console.log(error?.response?.data.message);
          router.push('/register')
        }
      }
    },
  },
});
