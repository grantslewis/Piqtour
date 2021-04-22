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
        <h2 class="option">{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
      </div>
     
      <uploader :show="showPhoto" :locationId="''" @close="close" @uploadFinished="uploadFinished"/>
      <location-adder :show="showLocation" @close="close" @uploadFinished="uploadFinished"/>
      <!-- <router-link to=""><i class="fas fa-map-marker-alt"></i></router-link>  -->
  </div>
  <Login v-else />
</div>
</template>

<script>
// import MyPhotos from '@/components/MyPhotos.vue';
import axios from 'axios';
import Login from '../components/Login.vue';
import Uploader from '../components/Uploader.vue';
import LocationAdder from '../components/LocationAdder.vue';

export default {
  name: 'dashboard',
  data() {
    return {
        showPhoto: false,
        showLocation: false,
    }
  },
  components: {
    // MyPhotos,
    Login,
    Uploader,
    LocationAdder
  },
  async created() {
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