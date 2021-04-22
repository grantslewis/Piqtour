<template>
  <div class="home">
    <div>
      <flicking 
        :options="{ gap: 400, moveType: 'freeScroll'}"
        @need-panel="e => {}"
        @move-end="e => {}"
        style="height: 250px"
      >
        <div class="panel" v-for="image in images" v-bind:key="image._id">
          <router-link class="photoLink" :to="{ name: 'Photo', params: { id: image._id }}">
            <img :src="image.path" style="height: 250px"/>
          </router-link>
        </div>
      </flicking>
    </div>

    <h3>Locations:</h3>
    <locations :locations="locations"/>

    <!-- <carousel :images.sync="images" :isFetching.sync="isFetching"/>    -->

  </div>
</template>

<script>

// import underscore from 'underscore';
// import UserModification from '../components/userImage.vue';
import { Flicking } from "@egjs/vue-flicking";
// import { Component, Vue } from "vue-property-decorator";
// import { Fade, AutoPlay } from "@egjs/flicking-plugins";
import axios from 'axios';
// import Carousel from '../components/Carousel.vue';
import Locations from '../components/Locations.vue';
export default {
  name: 'Home',
  data() {
    return {
      isEditAllowedtest: true,
      currlocation: null,

      images: [],
      isFetching: false,
      locations: [],
      users: [],
      // addNewUser: false,
      // test: ['Hello', 'My', 'Name', 'Is', 2],

      // slideIndex: 0,

      // currentImageIndex: 0,
      error: '',
      // len: this.$root.$data.images.length,
      // imgid: 1,
      // mainImageSrc: "/images/1.jpg",
    }
  },
  created() {
    // this.setFetching();
    this.getUsers();
    this.getLocations();
    this.getImages();
  },
  components: {
    Flicking: Flicking,
    // UserModification,
    // Carousel,
    Locations,
  },
  methods: {
    async getImages() {
        try {
            const response = await axios.get(`/api/photos/all`);
            this.images = response.data;

            // this.$set(this.images);
            // this.$set(this.isFetching, this.isFetching, false);
            this.setFetching();
            return true;
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
    async getLocations() {
      try {
        let response = await axios.get("/api/locations/all");
        this.locations = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    addUser() {
      this.addNewUser = !this.addNewUser;
    },
    setFetching() {
      this.isFetching = !this.isFetching
    },
  },
  computed: {
    // covercreation() {
    //   this.startInterval();
    //   return true;
    // }
    
  },
}

</script>


<style>
.home {
  width: 100%;
  height: 100%;
}

.slide {
  width: 100vw;
  height: 90vh;
  display: none;

}

/* .panel {
  height: 400px;
} */


.image {
  width: auto;
  margin: auto;
  max-width: 100%;
  height: 80vh;
  margin-bottom: 10px;
  object-fit:cover;
}

@media (min-width: 500px) {
  .info-wrapper {
      font-size: 1.25em;
  }
  .titles {
      margin-right: 20px;
  }
  .image {
    max-width: auto;
    max-height: 80%;
  }
}


</style>
