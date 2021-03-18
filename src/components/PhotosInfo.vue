<template>
    <div class="wrapper">
        <div class="image" :style="{'background-image':'url(/images/'}">
            <i class="fas fa-info-circle fa-2x"></i>
            <div class="info">
                <h2>{{inspirational_title}}</h2>
                <br>
                <h2>{{first_name}} + ", " + {{lastname}}</h2>
                <h3>{{city}} + ", " + {{country}}</h3>
                <h3>{{date_taken}}</h3>
            </div><template>
<div>
    <div class="photo" :style="{'background-image':'url(/images/' + photo.image + ')'}" @mouseover="hoverPhoto" @mouseout="hoverPhoto">
        <i class="fas fa-times-circle fa-2x" v-show="this.infoselect" @click="clickInfo" ></i>
        <i class="fas fa-info-circle fa-2x" v-show="this.photohover" @mouseover="hoverInfo"  @mouseout="hoverInfo" @click="clickInfo"></i>
        <div class="info_bubble">
            
        </div>
        <div class="info" v-show="this.infoselect || this.infohover">
            <h2 class="title">{{photo.inspirational_title}}</h2>
            <h2>{{photo.first_name}} {{photo.last_name}}</h2>
            <h3>{{photo.city}}, {{photo.country}} <br />{{photo.date_taken}}</h3>
        </div>
        <img class="photo" :src="'/images/'+photo.image" style="visibility: hidden;" />
    </div>
  <!-- <div class="info">
    <p>Congratulations, you have ordered {{random}} cases of {{product.name}}!</p>

    <p>This product is sourced from {{product.country}} at {{product.price}} per item,
      for a total of ${{amount}}. Your credit card has been billed and you will receive
      delivery within 3-30 weeks. Please contact us if it doesn't arrive within 1 year.</p>
  </div>
  <div class="image">
    <img :src="'/images/products/'+product.image">
  </div> -->

</div>
</template>

<script>
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
        </div>
    </div>
</template>