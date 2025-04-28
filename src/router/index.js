import { createRouter, createWebHashHistory } from "vue-router";

import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import AddProject from "../views/Projects.vue";

const routes = [
  { path: "/", name: "Signin", component: Signin },
  { path: "/signup", name: "Signup", component: Signup },
  {path: "/add-project", name:"AddProject", component: AddProject},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
