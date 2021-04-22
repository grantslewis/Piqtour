<template>
        <div class="wrapper">
            <photos :photos="photolist"></photos>
            <div class="images">
                <router-link class="imgdiv" v-for="image in images" :key="image.id" :to="'/photo/' + image.id">
                    <div class="image" :style="{'background-image':'url(/images/' + image.image + ')'}" @mouseover="hoverPhoto" @mouseout="hoverPhoto">
                        <img :src="'/images/'+image.image" class="image" style="visibility: hidden;" > 
                    </div>
                </router-link>
            </div>
        </div>
</template>

<script>
import underscore from 'underscore';
import axios from 'axios';
import Photos from '../components/Photos.vue';
export default {
  name: 'Gallery',
  data() {
    return {
      photohover: false,
      infohover: false,
      infoselect: false,
      random: 0,
      amount: 0,
      photolist: [],
    }
  },
  components:{
      Photos,
  },
  created() {
      this.getPhotos();
  },
  computed: {
      images() {
      return underscore.shuffle(this.$root.$data.images);
    },
  },
  methods: {
      hoverPhoto: function() {
          this.photohover = !this.photohover
      },
      hoverInfo: function() {
          this.infohover = !this.infohover
      },
      clickInfo: function() {
          this.infoselect = !this.infoselect
      },
      async getPhotos() {
            try {
                const response = await axios.get('/api/photos/all/');
                this.photolist = response.data;
            } catch (error) {
                console.log(error);
            }
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

.wrapper {
    width: 100%;
}

.images {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    width: 100%
}

.image {
    margin: 0px;
    width: auto;
    height: 250px;
    background-repeat: no-repeat;
    background-size: contain;
}

.imgdiv {
    margin: 0px;
    width: auto;
    height: auto;
    margin: 10px;
    border-radius: 5px 5px;
}


.photo {
    display: block;
    margin: auto;
    background-size: conatin;
    max-width: 100%;
    width: 100%;
    height: auto;
    max-height: 100vh;
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
       