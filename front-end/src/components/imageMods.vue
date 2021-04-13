<template>
<div>
<h1>User Upload and Editing!</h1>
  <div class="newUser">
    <div class="heading">
      <div class="circle">1</div>
      <h2>Upload a Piqtur</h2>
    </div>
    <div class="add">
        <form @submit.prevent="upload">         
            <input type="text" v-model="title" placeholder="Title">
            <p></p>
            <textarea v-model="description" placeholder="Description"></textarea>
            <p></p>
            <input type="text" v-model="location" placeholder="Location">
            <p></p>
            <input type="file" name="photo" @change="fileChanged">
            
            <button type="submit">Upload Image</button>
        </form>
      <div class="upload" @click="addUser" v-if="addedUser">
        <h2>{{addedUser.username}}'s account added propperly!</h2>
      </div>
    </div>
  </div>
    
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Account</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectImage(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="edit" v-if="findImage">
        <input type="text" v-model="findImage.title" placeholder="Title">
        <p></p>
        <textarea v-model="findImage.description" placeholder="Description"></textarea>
        <p></p>
        <input type="text" v-model="findImage.location" placeholder="Location">
        <p></p>
        <img :src="findImage.path" />
      </div>
      <div class="actions" v-if="findImage">
        <button @click="deleteItem(findUser)">Delete Image</button>
        <button @click="editItem(findUser)">Save Edits</button>
      </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'ImageModification',
  props: {
    activeUserId: String,
  },
  data() {
    return {
      file: null,
      title: "",
      description: "",
      location: "",

      // photos: [],
      // user: null,
      images: [],
      userImages: [],
      addedImage: null,
      
      findTitle: "",
      findImage: null,
    }
  },
  computed: {
    suggestions() {
      let photos = this.userImages.filter(i => i.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return photos.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/users/' + this.activeUserId + '/images', {
          title: this.title,
          description: this.description,
          location: this.location,
          path: r1.data.path
        });
        this.addedImage = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    selectImage(image) {
        this.image = image;
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
            const response = await axios.get(`/api/users/${this.activeUserId}/images`);
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

  },
  created() {
    this.getUserImages();
  },
  watch: {
    'activeUserId': function() { 
      this.getUserImages(); 
    }
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
  width: 18px;
  height: 18px;
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

