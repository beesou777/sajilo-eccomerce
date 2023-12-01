// dashboardRoutes.js
import {
    Login,
    Register
  } from "@utility/index";
  
  const userRouter = [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    }
  ];
  
  export default userRouter;
  