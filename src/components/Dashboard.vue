<template>
    <div class="user-profile">
      <h2>My Dashboard</h2>

      <div class="navigation-links">
        <router-link to="/my-projects">
          <button>My Projects</button>
        </router-link>
        <router-link to="/UpdateProfile">
          <button>Update Profile</button>
        </router-link>
        <router-link to="/AjouterComp">
          <button>Add Competence</button>
        </router-link>
      </div>

      <div>
        <p> Name: {{ userData.name }} </p>
        <p> Email: {{ userData.email }} </p>
        <p> Bio: {{ userData.bio }} </p>
        <p> Goals:{{ userData.goals }}</p>
  
        <div v-if="userData.competences && userData.competences.length">
          <h3>Competences</h3>
          <div
            v-for="(competence, index) in userData.competences"
            :key="index"
            class="competence-card"
          >
            <p> Name: {{ competence.name }}</p>
            <p> Level: {{ competence.level }}</p>
            <p> Date of acquisition: {{ competence.date_acqui }}</p>
            <p> Date of progression: {{ competence.date_progr }}</p>
            <Edit_comp 
              :userId="currentUserId" 
              :competence="user.competences[index]" 
              :competenceIndex="index"
            />
          </div>
        </div>
        <div v-else>
          <p>No competences listed.</p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import Edit_Comp from "./Edit_comp.vue";
  import { db, auth } from "../firebase-config";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
 

  export default {
    components: {
      Edit_Comp
    },
    data() {
      return {
        userData: {
          name: "",
          email: "",
          bio: "",
          goals: [],
          competences: []
        }
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            this.userData = data;
            this.competences = data.competences || [];
          }
        }
      },
      async updateProfile() {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, this.userData);
          alert("Updated Profile");
          this.$router.push("/Home");
        }
      }
    }
  };
  </script>
  
  