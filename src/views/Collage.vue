<template>
    <div class="wrapper">
        <h1 style="padding: 20px">Here is the Collage We Made You!</h1>
        <button id="collagebutton" v-on:click="resetPhotos">Get A New Collage</button>
        <div class="images">
            <router-link v-for="image in images" :key="image.id" :to="'/photo/' + image.id">
                <img :src="'/images/'+image.image" class="image"> 
            </router-link>
        </div>
    </div>
</template>

<script>
import underscore from 'underscore';

export default {
  name: 'Home',
  data() {
    return {
      photohover: false,
      infohover: false,
      infoselect: false,
      random: Math.random()*10 + 5,
    }
  },
  created() {
    this.photo = this.$root.$data.images.find(photo => photo.id === parseInt(this.$route.params.id));
  },
  computed: {
    images() {
        return underscore.shuffle(this.$root.$data.images).slice(0,this.random);
    },
  },
  methods: {
      resetPhotos: function() {
          this.random = Math.random()*10 + 5;
          this.images = underscore.shuffle(this.$root.$data.images).slice(0,this.random);
      },
  },
}
</script>



<style scoped>
.intro {
  font-style: italic;
}

.products {
  display: flex;
  flex-wrap: wrap;
}

.images {
    display: flex;
    justify-content: center;
    align-content: center;
    
    max-width: 100%;
}

.image {
    max-height: 100%;
}

.photo {
    display: block;
    margin: auto;
    background-size: conatin;
    max-width: 100%;
    width: 100%;
    height: auto;
    max-height: 100vh;
    padding: 10px;
    /* object-fit: contain; */
}

#collagebutton {
    margin: 0px 0px 20px 0px;
    color: rgb(0,74,171);
    background-color: #35B5FF;
    padding: 10px;
    border: 0px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1em;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: flex-start;
}
.info h2, .info h3 {
    text-align: right;
    margin: 2px;    
}
h2.title {
    margin-bottom: 20px !important;
}

.fa-info-circle, .fa-times-circle {
    max-height: 25%;
    max-width: 25%;
    width: auto;
    height: auto;
    aspect-ratio: 1;
    padding: 10px;
}

@media (min-width: 500px) {
    .fa-info-circle, .fa-times-circle {
        max-width: 80px;
    }
}
</style>
       