<template>
  <div class="home">
    <router-link :key="this.imgid" :to="'/photo/' + this.imgid">
      <img :src="this.mainImageSrc" class="image"> 
    </router-link>
  </div>
</template>

<script>

import underscore from 'underscore';
export default {
  name: 'Home',
  data() {
    return {
      len: this.$root.$data.images.length,
      imgid: 1,
      mainImageSrc: "/images/1.jpg",
    }
  },
  methods: {
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
    images() {
      return underscore.shuffle(this.$root.$data.images);
    },
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
