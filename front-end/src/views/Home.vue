<template>
  <div class="home">
    <div>
      <div>Words</div>
      <flicking 
        
        :options="{ gap: 10, moveType: 'freeScroll'}"
        @need-panel="e => {}"
        @move-end="e => {}"
        style="height: 120px"
      > 
      <!-- :plugins="plugins" 
      :tag="'div'"
        :viewportTag="'div'"
        :cameraTag="'div'"
      -->
        
        <!-- <div class="panel" v-for="word in test" :key="word"><p>{{word}}</p></div> -->
        <div class="panel" v-for="image in images" v-bind:key="image._id"> <img :src="image.path"/></div>
      </flicking>
    </div>

    <h3>Locations:</h3>
    <locations :locations="locations"/>
    

    <carousel :images.sync="images" :isFetching.sync="isFetching"/>

    <!-- <div class="slideshow-container"> 
      <div class="image" v-for="image in images" :key="image.id">
        <router-link :key="this.imgid" :to="'/photo/' + this.imgid">
          <img :src="images.path" />
        </router-link>
        <div class="text">{{image.title}}</div>
      </div>
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <p /> -->
    <!-- <h2>{{item.title}}</h2> -->
    <div style="text-align:center">
      <span class="dot" v-for="image in images" :key="image.id"  @click="currentSlide(image.id)"></span>
      <!-- <span class="dot" @click="currentSlide(1)"></span>
      <span class="dot" @click="currentSlide(2)"></span>
      <span class="dot" @click="currentSlide(3)"></span> -->
    </div>
    <!-- <button @click="addUser">Create User</button> -->
    <!-- <button @click="uploadImage">Upload Piq</button> -->
    <!-- <user-modification :isEditAllowed="false"/> -->
    <!-- <image-modification/> -->
    <!-- v-if="this.addNewUser" -->
    

  </div>
</template>

<script>

// import underscore from 'underscore';
// import UserModification from '../components/userImage.vue';
import { Flicking } from "@egjs/vue-flicking";
// import { Component, Vue } from "vue-property-decorator";
// import { Fade, AutoPlay } from "@egjs/flicking-plugins";
import axios from 'axios';
import Carousel from '../components/Carousel.vue';
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
    Carousel,
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
    // async uploadImage() {
    //   try {
    //     const formData = new FormData();
    //     formData.append('photo', this.file, this.file.name);
    //     formData.append('title', this.title);
    //     formData.append('description', this.description);
    //     let r1 = await axios.post('/api/photos/' + this.currlocation._id, formData);
    //     this.file = null;
    //     this.url = "";
    //     this.title = "";
    //     this.description = "";
    //     // let r2 = await axios.post('/api/images', {
    //     //   title: this.title,
    //     //   description: this.description,
    //     //   locationId: this.currlocation._id,
    //     //   userid: this.activeUserid,
    //     //   path: r1.data.path
    //     // });
    //     // this.addItem = r2.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {this.slideIndex = 1}
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block";
      dots[this.slideIndex-1].className += " active";

    },
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    },
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    },
    startInterval: function () {
      setInterval(() => {
        this.getNextId();
        this.mainImageSrc = '/images/' + this.images[this.imgid].image;
      }, 5000);
    },
    getNextId() {
      this.imgid = Math.floor(Math.random()*this.images.length)
    },
    // watch: {
    //   'isFetched': 
    // }
  },
  computed: {
    // images() {
    //   return underscore.shuffle(this.$root.$data.images);
    // },
    // lenSet() {
    //   return this.$root.$data.images.length;
    // },
    covercreation() {
      this.startInterval();
      return true;
    }
    
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
