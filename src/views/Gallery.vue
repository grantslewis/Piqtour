<template>
    <div class="wrapper">
        <!-- <div class="image" :style="{'background-image':'url(/images/'}">
            <i class="fas fa-info-circle fa-2x"></i>
            <div class="info">
                <h2>{{inspirational_title}}</h2>
                <br>
                <h2>{{first_name}} + ", " + {{lastname}}</h2>
                <h3>{{city}} + ", " + {{country}}</h3>
                <h3>{{date_taken}}</h3>
            </div>
        </div> -->
        <div class="images">
            <router-link class="imgdiv" v-for="image in images" :key="image.id" :to="'/photo/' + image.id">
                <div class="image" :style="{'background-image':'url(/images/' + image.image + ')'}" @mouseover="hoverPhoto" @mouseout="hoverPhoto">
                    <img :src="'/images/'+image.image" class="image" style="visibility: hidden;" > 
                </div>
            </router-link>
        </div>
        
        <!-- <div class="photos" v-for="image in images" :key="image.id">
            <div class="photo" :style="{'background-image':'url(/images/' + image.image + ')'}" @mouseover="hoverPhoto" @mouseout="hoverPhoto">
                <i class="fas fa-times-circle fa-2x" v-show="this.infoselect" @click="clickInfo" ></i>
                <i class="fas fa-info-circle fa-2x" v-show="this.photohover" @mouseover="hoverInfo"  @mouseout="hoverInfo" @click="clickInfo"></i>
                <div class="info_bubble">
                    
                </div>
                <div class="info" v-show="this.infoselect || this.infohover">
                    <h2 class="title">{{image.inspirational_title}}</h2>
                    <h2>{{image.first_name}} {{image.last_name}}</h2>
                    <h3>{{imagecity}}, {{image.country}} <br />{image.date_taken}}</h3>
                </div>
                <img class="photo" :src="'/images/'+image.image" style="visibility: hidden;" />
            </div>
        </div> -->
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
      random: 0,
      amount: 0,
      photo: {},
    }
  },
//   props: {
//     images: Array
//   },
  created() {
    this.photo = this.$root.$data.images.find(photo => photo.id === parseInt(this.$route.params.id));
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

.wrapper {
    width: 100%;
}

.images {
    display: flex;
    justify-content: left;
    align-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 95%;
    max-height: 250vh;
    height: auto;
}

.image {
    margin: 0px;
    width: auto;
    /* padding: 5px; */
    height: 250px;
    /* border-radius: 5px 5px; */
    background-repeat: no-repeat;
    background-size: contain;
}

.imgdiv {
    margin: 0px;
    width: auto;
    /* padding: 5px; */
    height: auto;
    /* height: 200px; */
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
    /* object-fit: contain; */
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
       