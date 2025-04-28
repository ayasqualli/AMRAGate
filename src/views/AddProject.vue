<template>
  <form @submit.prevent="submitForm" class="form">
    <h1>Add Project</h1>

    <div class="form-group">
      <label>Project's name</label>
      <input
        type="text"
        v-model="formData.title"
        required
        class="form-input"
        placeholder="Enter Project Title"
      />
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea
        v-model="formData.description"
        required
        class="form-input"
        placeholder="Enter Project Description"
      ></textarea>
    </div>

    <div class="form-group">
      <label>Project Stack</label>
      <div class="input-container">
        <input
          type="text"
          v-model="newTech"
          @keyup.enter="addTech"
          placeholder="Add a new technology and hit Enter"
          class="tech-input"
          required
        />
        <button @click="addTech" class="add-btn">Add</button>

        <div class="tags">
            <span v-for="(tech, index) in formData.techStack" :key="index" class="tech-tag"> {{ tech }}
                <button @click="removeTech(index)" class="remove-btn">x</button>
            </span>
        </div>
      </div>
    </div>

    <div class="form-group">
        <label>Github Link</label>
        <input type="url" v-model="formData.github" placeholder="Add your project link" />
    </div>

    <div class="form-group">
        <label>Upload project image</label>
        <div class="image"></div>
    </div>
  </form>
</template>

<script>
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
    name: "AddProject",
    data(){
        return {
            newTech:"",
            formData: {
                title: "",
                description: "",
                techStack: [],
                github: "",
            }
        }
    },
    methods: {
        addTech() {
            if (this.newTech.trim() !== ''){
                this.formData.techStack.push(this.newTech.trim());
                this.newTech = '';
            }
        },
        removeTech(index){
            this.formData.techStack.splice(index, 1);
        }
    },
    async submitForm(){
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const userId = user.uid;

                const projectRef = await addDoc(collection(db, 'projects'), {
                    title: this.formData.title,
                    description: this.formData.description,
                    owner: userId,
                    addedAt: new Date(),
                    techStack : this.formData.techStack,
                    github : this.formData.github
                });

                return projectRef;
            }else{
                throw new Error("User not authenticated");
            }
        }
        catch (error) {
            console.log("Error storing project:", error);
            throw error;
        }
    }
};
</script>

<style scoped>
.input-container {
  display: flex;
  margin-bottom: 10px;
}

.tech-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.add-btn {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #218838;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 14px;
}

.remove-btn {
  margin-left: 8px;
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
}

.remove-btn:hover {
  color: #dc3545;
}
</style>
