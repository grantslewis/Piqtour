<template>
  <div class="home">
    <div class="slideshow-container"> 
      <div class="image" v-for="image in images" :key="image.id">
        <router-link :key="this.imgid" :to="'/photo/' + this.imgid">
          <img :src="images.path" />
        </router-link>
        <div class="text">{{image.title}}</div>
        <!-- <h2>{{item.title}}</h2> -->
      </div>
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <p />
    <div style="text-align:center">
      <span class="dot" v-for="image in images" :key="image.id"  @click="currentSlide(image.id)"></span>
      <!-- <span class="dot" @click="currentSlide(1)"></span>
      <span class="dot" @click="currentSlide(2)"></span>
      <span class="dot" @click="currentSlide(3)"></span> -->
    </div>
    <button @click="addUser">Create User</button>
    <button @click="uploadImage">Upload Piq</button>
    <user-modification/>
    <!-- <image-modification/> -->
    <!-- v-if="this.addNewUser" -->
    

  </div>
</template>

<script>

// import underscore from 'underscore';
import UserModification from '../components/userImage.vue'
// import ImageModification from '../components/imageMods.vue'
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      addNewUser: false,
      images: [],
      addImage: null,
      addedUser: null,
      findTitle: "",
      findItem: null,

      file: null,
      title: "",
      description: "",
      location: "",

      slideIndex: 0,

      currentImageIndex: 0,
      len: this.$root.$data.images.length,
      imgid: 1,
      mainImageSrc: "/images/1.jpg",
    }
  },
  components: {
    UserModification,
    // ImageModification
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/images");
        this.images = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    addUser() {
      this.addNewUser = !this.addNewUser;
    },
    // async addUser() {
    //   try {
    //     let r1 = await axios.post('/api/images', {
    //       title: this.title,
    //       description: this.description,
    //       location: this.location,
    //       userid: this.activeUserid,
    //       path: r1.data.path
    //     });
    //     this.addedUser = r1.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async uploadImage() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/images', {
          title: this.title,
          description: this.description,
          location: this.location,
          userid: this.activeUserid,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
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
        this.mainImageSrc = '/images/' + this.$root.$root.images[this.imgid].image;
      }, 5000);
    },
    getNextId() {
      this.imgid = Math.floor(Math.random()*this.len)
    }
  },
  computed: {
    // images() {
    //   return underscore.shuffle(this.$root.$data.images);
    // },
    lenSet() {
      return this.$root.$data.images.length;
    },
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
