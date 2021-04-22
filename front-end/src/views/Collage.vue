<template>
    <div class="wrapper">
        <h1 style="padding: 20px">Here is the Collage We Made You!</h1>
        <button id="collagebutton" v-on:click="resetPhotos">Get A New Collage</button>
        <div class="images">
            <router-link v-for="image in photolist" v-bind:key="image._id" :to="image.path">
                <img :src="image.path" class="image"> 
            </router-link>
        </div>
    </div>
</template>

<script>
import underscore from 'underscore';
import axios from 'axios';
export default {
  name: 'Collage',
  data() {
    return {
      photohover: false,
      infohover: false,
      infoselect: false,
      random: 1,
      photolist: [],
      rawlist: [],
    }
  },
  created() {
    //   this.randomNum();
      this.getPhotos();
    // this.photo = this.$root.$data.images.find(photo => photo.id === parseInt(this.$route.params.id));
  },
  computed: {
    images() {
        return underscore.shuffle(this.photolist).slice(0,this.random);
    },
  },
  methods: {
      resetPhotos: function() {
        //   this.random = Math.random()*10 + 5;
        this.randomNum()
        this.photolist = underscore.shuffle(this.rawlist).slice(0,this.random);
      },
      async getPhotos() {
            try {
                const response = await axios.get('/api/photos/all/');
                this.rawlist = response.data;
                this.resetPhotos();
            } catch (error) {
                console.log(error);
            }
        },
    randomNum() {
        var init = Math.random()* (this.rawlist.length - 2) + 2;
        // init = init % this.rawlist.length;
        // if (init < 4) {
        //     init = 3;
        // }
        this.random = init;
    }
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
       