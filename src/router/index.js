import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import Edit_comp from '../components/Edit_comp.vue'; 
import Signup from '../views/Signup.vue';
import Signin from '../views/Signin.vue';
import AjouterComp from '../views/AjouterComp.vue';
import AddProject from '../views/AddProject.vue';
import HomeView from '../views/HomeView.vue';


const routes = [
  {
    path: '/Home',
    name: 'home',
    component: HomeView
  },
  {
    path: "/signin", 
    name: "Signin",
    component: Signin
  },
  {
    path: "/signup", 
    name: "Signup",
    component: Signup
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/UpdateProfile',
    name: 'UpdateProfile',
    component: UpdateProfile
  },
  { path: '/', name: 'Signin', component: Signin },
  {path: '/signup', name:'Signup',component: Signup},
  {
    path: '/Edit_comp',
    name: 'Edit_comp',
    component: Edit_comp
  },
  {
    path:'/my-projects',
    name:'my-projects'
  },
  {
    path:'/AjouterComp',
    name:'AjouterComp',
    component: AjouterComp
  },
  {
    path: '/add-project',
    name: "AddProject", 
    component: AddProject
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
