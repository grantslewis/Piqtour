<template>
  <div class="home">
    <router-link :key="this.imgid" :to="'/photo/' + this.imgid">
      <img :src="this.mainImageSrc" class="image"> 
    </router-link>
    <!-- <div class="main-image">
      
    </div> -->
    <!-- <div class="image-list">
      <div v-for="image in images" :key="image.id"><img src=""></div>
    </div> -->
    <!-- <router-link v-for="image in images" :key="image.id" :to="'/photo/' + image.id"> -->
      <!-- <img :src="'/images/'+image.image" class="image">   -->
    <!-- </router-link> -->
    
    <!-- <button :to="'/images/' + this.images[Math.floor(Math.random()*this.images.length)].image>Random</button> -->
  </div>
</template>

<script>

import underscore from 'underscore';
export default {
  name: 'Home',
  data() {
    return {
      mainImageSrc: "/images/1.jpg",
      // mainImageSrc: "http://via.placeholder.com/600x600/5ce1e6?text=Loading+Please+Wait!",
      imgid: 1
    }
  },
  methods: {
    startInterval: function () {
      // setTimeout(function () {
      //   if (this.imgid == -1) {
      //       alert('ERROR');
      //   }
      // }, 2000);
      setInterval(() => {
        this.imgid = Math.floor(Math.random()*this.images.length)
        this.mainImageSrc = '/images/' + this.images[this.imgid].image;
      }, 10000);
    }
  },
  computed: {
    images() {
      return underscore.shuffle(this.$root.$data.images);
    },
    covercreation() {
      this.startInterval();
      return true;
    }
    
  },
  created() {
    setInterval(function(){ 
 
      this.mainImageSrc = '/images/' + this.images[Math.floor(Math.random()*this.images.length)].image;
      this.counter++;
      this.counter %= this.images.length;
    }, 5000);

  },
}

</script>


<style>
.home {
  width: 100%;
  height: 100%;
  /* margin-left: -10px;
  padding-left: -10px; */
  /* padding: 5px; */
}

.image {
 
  width: auto;
  /* height: auto; */
  /* display: block; */
  margin: auto;
  max-width: 100%;
  /* aspect-ratio: 1; */
  /* width: auto; */
  height: 80vh;
  /* max-height: 80%; */
  margin-bottom: 10px;
  object-fit:cover;
  /* overflow-x:hidden; */
}

@media (min-width: 500px) {
  /* .home {
    padding: 10px 120px;
  } */
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

/* .image {
  width: 100px;
  height: 100px;
  background-color: blueviolet;
} */
</style>
