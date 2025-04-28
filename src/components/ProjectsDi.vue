<template>
    <div>
        <ul>
        <li v-for=" project in projects" :key="project.id"> 
        <p>{{ project.title }}</p>
        <p>{{ project.description }}</p>
        <p>{{ project.github }}</p>
        <div>{{ project.image }}</div>
        <div v-for =" element in project.techStack" :key="element"> 
                 element
        </div>

    </li>
    </ul>

        
     
    </div>
  
    
  </template>
  
  <script>
import { db } from "../firebase-config.js"; 
import { collection, getDocs } from "firebase/firestore";

  
export default {

    name: 'ProjectsDi',
    data() {
    return {
      projects: [],
  }
},

  async created() {
    const querySnapshot = await getDocs(collection(db, "projects"));
    this.projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
      
  </script>
  
  <style scoped>
  
  
  </style>
  