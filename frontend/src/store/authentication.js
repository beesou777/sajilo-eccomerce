import { defineStore } from "pinia";
import axios from "../utility/axios";
import Cookies from "js-cookie";
import router from "../router/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    uuid: JSON.parse(localStorage.getItem("uuid")) || null,
    user_details: JSON.parse(localStorage.getItem("user_details")) || null,
    access_token: JSON.parse(localStorage.getItem("access_token")) || null,
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
        if ((res.status = 200)) {
          this.uuid = res.data.uuid;
          Cookies.set("token", res.data.access_token, { expires: 7 });
          localStorage.setItem("uuid", JSON.stringify(res.data.uuid));
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },

    async getUserDetails() {
      try {
        const token = Cookies.get("token");
        if (token) {
          const res = await axios.get(`/users`, {
            headers: {
              user_id: this.uuid || null,
            },
          });
          if (res.status == 200) {
            this.user_details = res.data.user_details
            localStorage.setItem(
              "user_details",
              JSON.stringify(res.data.user_details)
            );
          }
        } else {
          this.logout();
        }
      } catch (error) {
        if (error?.response?.status == 404) {
          localStorage.clear();
          router.push("/login");
        }
      }
    },

    logout() {
      localStorage.clear();
      Cookies.remove("token");
      router.push("/login");
    },

    async updateUserDetails(data) {
      try {
        const res = await axios.patch(
          "/users",
          {
            store_name: data.store_name,
            first_name: data.first_name,
            last_name: data.last_name,
          },
          {
            headers: {
              user_id: this.uuid || null,
            },
          }
        );
        if (res.status == 200) {
          this.user_details = res.data.user_details
          localStorage.setItem(
            "user_details",
            JSON.stringify(res.data.user_details)
          );
          router.push("/dashboard/profile")
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updatePassword(data) {
      try {
        const res = await axios.patch(
          "/users/update/password",
          {
            current_password: data.current_password,
            new_password: data.new_password,
            confirm_password: data.confirm_password,
          },
          {
            headers: {
              user_id: this.uuid || null,
            },
          }
        )
        if(res.status == 200){
          router.push("/dashboard/profile")
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    },
    
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
