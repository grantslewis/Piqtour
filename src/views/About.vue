<template>
    <div class="wrapper">
        <div class="images">
            <router-link v-for="image in images" :key="image.id" :to="'/photo/' + image.id">
                <div class="photo" :style="{'background-image':'url(/images/' + image.image + ')'}" @mouseover="hoverPhoto" @mouseout="hoverPhoto">
                    <img :src="'/images/'+image.image" class="image" style="visibility: hidden;" > 
                </div>
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
      random: 0,
      amount: 0,
      photo: {},

    }
  },
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

.images {
    display: flex;
    justify-content: center;
    align-content: center;
    
    max-width: 80%;
    
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
       