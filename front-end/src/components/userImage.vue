<template>
<div>
<h1>User Upload and Editing!</h1>
  <div class="newUser">
    <!-- v-if="addNewUser"  -->
    <div class="heading">
      <div class="circle">1</div>
      <h2>Create a User Acount</h2>
    </div>
    <div class="add">
        <form @submit.prevent="addUser">
            <input type="text" v-model="username" placeholder="New Username">
            <p></p>
            <input type="text" v-model="firstname" placeholder="First Name">
            <p></p>
            <input type="text" v-model="lastname" placeholder="Last Name">
            <p></p>
            <input type="number" v-model="age" placeholder="Age">
            <p></p>
            <button type="submit">Create User</button> 
            <!-- @click="addUser()"  -->
        </form>
      <!-- <div class="upload" @click="addUser" v-if="addedUser">
        <h2>{{addedUser.username}}'s account added propperly!</h2>
      </div> -->
    </div>
  </div>
    
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Account</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findUsername" placeholder="Search Your User">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectUser(s)">{{s.username}}
          </div>
        </div>
      </div>
      <div class="editingUser" v-if="findUser" @click="toggleEditUser()">
        <h2>{{findUser.username}} is the active user</h2>
        <br>
        <button @click="editUser = !editUser">Edit Account</button>
      </div>
      

      <div class="update" v-if="editUser === true">
        <div > 
          <h4>Username:</h4>
          <input type="text" v-model="findUser.username" placeholder="Username">
        </div>
        <div> 
          <h4>First Name:</h4>
          <input type="text" v-model="findUser.firstname" placeholder="First Name">
        </div>
        <div> 
          <h4>Last Name:</h4>
          <input type="text" v-model="findUser.lastname" placeholder="Last Name">
        </div>
        <div> 
          <h4>Age:</h4>
          <input type="number" v-model="findUser.age" placeholder="Age">
        </div>
        <div class="actions" v-if="findUser">
          <button @click="updateUser(findUser)">Save Changes</button>
          <button @click="deleteUser(findUser)">Delete</button>
        </div>

        <!-- <image-modification :activeUserId="findUserId"/> -->
        <!-- v-if="editUser === true" -->

        <!-- <input v-model="findItem.title">
        <p></p>
        <textarea v-model="findItem.description"></textarea>
        <p></p>
        <img :src="findItem.path" /> -->
      </div>
      
    </div>
    
</div>
</template>


<script>
import ImageModification from './imageMods';
import axios from 'axios';
export default {
  components: { ImageModification },
  name: 'UserModification',
  data() {
    return {
      username: "",
      firstname: "",
      lastname: "",
      age: "",

      file: null,
      title: "",
      description: "",
      location: "",

      users: [],
      user: null,
      images: [],
      userImages: [],

      // activeUserid: "",
      // addedUser: null,
      
      editUser: false,
      findUsername: "",
      findUser: null,
      findUserId: "",
    }
  },
  computed: {
    suggestions() {
      let users = this.users.filter(user => user.username.toLowerCase().startsWith(this.findUsername.toLowerCase()));
      return users.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async addUser() {
      try {
        await axios.post('/api/users', {
          username: this.username,
          firstname: this.firstname,
          lastname: this.lastname,
          age: this.age,
        });
        await this.getUsers();
        this.$notify({
          title: 'New user ' + this.username + ' has been added!',
          text: 'Welcome to the Community!'
        });
        this.username = "";
        this.firstname = "";
        this.lastname = "";
        this.age = "";

      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        const response = await axios.get("/api/users");
        this.users = response.data;
        // return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectUser(user) {
        this.findUsername = "";
        this.findUser = user;
        this.findUserId = user._id;
        this.$notify({
          title: this.findUser.username + ' is now active!',
          text: 'Welcome Back!'
        });
        // this.getImages();
    },
    async getUser(user) {
      try {
        this.findUser = null;
        let response = await axios.get("/api/users/" + user._id);
        this.findUser = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getImages() {
        try {
            const response = await axios.get(`/api/users/images`);
            this.images = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getUserImages() {
        try {
            const response = await axios.get(`/api/users/${this.user._id}/images`);
            this.userImages = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async addImage() {
        try {
            await axios.post(`/api/projects/${this.project._id}/items`, {
                title: this.title,
                description: this.description,
                location: this.location
            });
            this.title = "";
            this.description = "";
            this.location = "";
            this.getImages();
        } catch (error) {
            console.log(error);
        }
    },
    async updateImage(image) {
        try {   
            axios.put(`/api/users/${this.user._id}/images/${image._id}`, {
                title: image.title,
                description: image.description,
                location: image.location
            });
            this.getImages();
        } catch (error) {
            console.log(error);
        }
    },
    async deleteImage(image) {
        try {
            await axios.delete(`/api/users/images/${image._id}`);
            this.getImages();
        } catch (error) {
            console.log(error);
        }
    },
    active(user) {
        return (this.user && user._id === this.user._id);
    },
    
    async deleteUser(user) {
      try {
        await axios.delete("/api/users/" + user._id);

        this.editUser = false;
        this.findUser = null;
        this.getUsers();
        this.$notify({
          title: user.username + "'s account was deleted :'(",
          text: 'We hope you come back soon!'
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser(user) {
      try {
        await axios.put("/api/users/" + user._id, {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
        });
        // this.findUser = null;
        this.$notify({
          title: "Update for " + user.username + " was successful!",
          text: 'You are a valued member of the community!'
        });
        this.editUser = false;
        this.getUsers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getUsers();
    this.getImages();
  },
}
</script>



<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

