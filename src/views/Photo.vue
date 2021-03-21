<template>
<div class="photo-wrapper">
    <!--  <router-link v-for="image in images" :key="image.id" :to="'/photo/' + image.id"> -->
    <!-- <router-link :key="this.$route.params.id - 1" :to="'/photo/' + this.$route.params.id - 1" tag="button">Previous</router-link>
    <router-link :key="this.random" :to="'/photo/' + this.random" tag="button">Random</router-link>
    <router-link :key="this.$route.params.id + 1" :to="'/photo/' + this.$route.params.id + 1" tag="button">Next</router-link> -->
    <!-- <button id="collagebutton" v-on:click="previousPhoto">Previous</button> -->
    <div class="photo-wrapper">
        <img class="photo" :src="'/images/'+photo.image" />
        
        <table class="info-wrapper">
            <tr>
                <td class="titles">Title: </td>
                <td class="info">{{photo.inspirational_title}}</td>
            </tr>
            <tr>
                <td class="titles">Photographer: </td>
                <td class="info">{{photo.first_name}} {{photo.last_name}}</td>
            </tr>
            <tr>
                <td class="titles">Location: </td>
                <td class="info">{{photo.city}}, {{photo.country}}</td>
            </tr>
            <tr>
                <td class="titles">Date Taken: </td>
                <td class="info">{{photo.date_taken}}</td>
            </tr>
        </table>
    </div>
</div>
</template>



<script>
export default {
  name: 'Home',
  data() {
    return {
      photo: {},
      current: this.photo.id,
      previous: this.photo.id - 1,
      next: (this.photo.id + 1) % this.$root.$data.images.length,
      random: Math.floor(Math.random()*this.$root.$data.images.length)
    }
  },
  methods: {
        getPhoto: function() {
          if (this.$route.params.id < 1) {
              this.$route.params.id = this.$root.$data.images.length - 1
          } else if (this.$route.params.id > this.$root.$data.images.length) {
              this.$route.params.id %= this.$root.$data.images.length
          }
          this.current = this.$route.params.id;
          return this.$root.$data.images.find(photo => photo.id === parseInt(this.$route.params.id));
        },
        // previousPhoto: function(id) {
        // //   if (this.$root.$data.previous.length == 0) {
        // //       if (this.photo.id == 0) {
        // //           this.$route.params.id = this.$root.$data.images.length - 1
        // //       } else {
        // //           this.$route.params.id = this.photo.id - 1;
        // //       }
        // //   } else {
        // //       this.$route.params.id = this.$root.$data.previous[this.$root.$data.previous.length - 1];
        // //       this.$root.$data.previous.push(this.photo.id);
        // //   }
        // //   this.previous = this.getPhoto().id;
        //     if (id == 1) {
        //         return this.$root.$data.images.length - 1
        //     } else {
        //         return id - 1;
        //     }
        // },
        // nextPhoto: function(id) {
        //     return (id + 1) % this.$root.$data.images.length;
        // },
        // randomPhoto: function() {
        //     return Math.floor(Math.random()*this.$root.$data.images.length)
        // }
  },
  created() {
    this.photo = this.getPhoto();
  },
}
</script>



<style scoped>
.photo-wrapper {
    padding: 5px;
    height: 100%;
    width: auto;
}

.photo {
    display: block;
    margin: auto;
    max-width: 100%;
    width: auto;
    height: auto;
    max-height: 80%;
    margin-bottom: 10px;
    object-fit: contain;
    border-radius: 5px;
    box-shadow: 0 6px 16px -1px rgb(0 0 0 / 18%);
}

.info-wrapper {
    /* display: flex;
    flex-direction: row; */
    text-align: right;
    font-size: 0.9em;
}

.titles {
    margin-right: 8px;
    color: #717171;
}

.info {
    padding-left: 10px;
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: flex-start;
}

.tab {
    padding-left: 2px;
    display: inline;
}

@media (min-width: 500px) {
  .photo-wrapper {
    padding: 10px 120px;
  }
  .info-wrapper {
      font-size: 1.25em;
  }
  .titles {
      margin-right: 20px;
  }
}

</style>