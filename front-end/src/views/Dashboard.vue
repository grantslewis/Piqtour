<template>
<div class="dashboard">
  <div v-if="user">
      <div class="dashboardOptions">
        <p class="option"><a @click="togglePhoto">
            <i class="fas fa-plus fa-2x" style="padding-right: 5px;"></i>
            <i class="fas fa-image fa-2x"></i>
        </a></p>
        <p class="option"><a @click="toggleLocation">
            <i class="fas fa-plus fa-2x" style="padding-right: 5px;"></i>
            <i class="fas fa-map-marker-alt fa-2x"></i>
        </a></p>
        <h2 class="option"><a @click="logout">{{user.firstName}} {{user.lastName}} <i class="fas fa-sign-out-alt"></i></a></h2>
      </div>
     
      <uploader :show="showPhoto" :locationId="''" @close="close" @uploadFinished="uploadFinished"/>
      <location-adder :show="showLocation" @close="close" @uploadFinished="uploadFinished"/>

      <!-- <h3>Account Settings:</h3>
      <form class="pure-form">
        <input placeholder="first name" v-model="firstName">
        <br>
        <input placeholder="last name" v-model="lastName">
        <br>
        <input placeholder="username" v-model="username">
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="update">Update Information</button>
      </form> -->
      <locations :locations="locationlist"></locations>
      <!-- <input type="password" placeholder="password" v-model="npassword"> -->
  </div>
  <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import Login from '../components/Login.vue';
import Uploader from '../components/Uploader.vue';
import LocationAdder from '../components/LocationAdder.vue';
import Locations from '../components/Locations.vue';
export default {
  name: 'dashboard',
  data() {
    return {
        showPhoto: false,
        showLocation: false,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        locationlist: [],
        // password: this.password,
        // npassword: this.password,
    }
  },
  components: {
    Login,
    Uploader,
    LocationAdder,
    Locations
  },
  async created() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.username = this.user.username;
      
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    togglePhoto() {
        this.showLocation = false;
        this.showPhoto = true;
    },
    toggleLocation() {
        this.showPhoto = false;
        this.showLocation = true;
    },
    close() {
      this.showPhoto = false;
      this.showLocation = false;
    },
    uploadFinished() { //async
      this.showPhoto = false;
      this.showLocation = false;
    //   this.getPhotos();
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getLocations() {
      try {
        let response = await axios.get("/api/locations/user/" + this.user._id);
        this.locationlist = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding-top: 10px;

}

.dashboardOptions {
    display: flex;
    flex-direction: row;
    justify-content: end;

}



.option {
    margin: 15px;
}
</style>