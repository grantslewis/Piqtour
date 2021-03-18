<template>
  <div class="home">
    <router-link v-for="image in images" :key="image.id" :to="'/photo/' + image.id">
      <img :src="'/images/'+image.image" class="image">  
      <!-- + {{image.image}}> -->
    </router-link>

    <!-- <img id="coverphoto" alt="Photo Slideshow" src="../../public/images/1.jpg"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// export default {
//   name: 'Home',
//   components: {
//     HelloWorld
//   }
// }


import underscore from 'underscore';
export default {
  name: 'Home',
  computed: {
    images() {
      return underscore.shuffle(this.$root.$data.images);
    }
  }
}

</script>


<style>
.image {
  width: 100px;
  height: 100px;
  background-color: blueviolet;
}
</style>
