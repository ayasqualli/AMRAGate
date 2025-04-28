import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import Edit_comp from '../components/Edit_comp.vue'; 
import Signup from '../views/Signup.vue';
import Signin from '../views/Signin.vue';
import AjouterComp from '../views/AjouterComp.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
