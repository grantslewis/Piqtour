<template>
<div>
  <section class="photo-gallery">
    <div class="photo" v-for="photo in photos" v-bind:key="photo._id">
      <router-link class="photoLink" :to="{ name: 'Photo', params: { id: photo._id }}">
          <h2>{{photo.title}}</h2>
          <img :src="photo.path" />
      </router-link>
      

      <div class="photoInfo">
        <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
        <p class="photoDate">{{formatDate(photo.created)}}</p>
      </div>
      <!-- <p class="photoCount">{{photoCount(photo._id)}} Posts About This Photo</p> -->
    </div>
  </section>
</div>
</template>

<script>
//  :center='photoPosition(photo)'
//         :zoom='10'
// import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Photos',
  props: {
    photos: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    // geolocate: function() {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //   });
    // },
  }
}
</script>

<style scoped>
.photoInfo {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  /* font-size: 0.8em; */
  font-size: 1.1em;
}

.photoInfo p {
  
  margin: 0px;
}

.photoLink a {
    text-decoration: none;

}

a:hover .map {
    box-shadow: 10px 5px 5px grey;
}

/* .photoDate {
  font-size: 0.7em;
  font-weight: normal;
} */

/* .photo {
    width: 200px;
    height: 300px;
    
} */

/* .map {
    
    -webkit-border-radius:20px;
    -moz-border-radius: 20px;
    -webkit-transform: translate3d(0px, 0px, 0px);

} */

.photo-gallery {
  column-gap: 1em;
}

.photo {
  margin: 0 0 1.5em;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}
.photo img {
  height: 200px;
}

.photo img , router-link{
    border:0;
    text-decoration:none;
    outline:none
}

router-link:hover, .image img:hover{
    box-shadow: 0 0 10px 3px rgb(79, 79, 79);
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .photo-gallery {
    column-count: 4;
    /* margin-left: 2em; */
    justify-content: space-evenly;
  }
  .photo {
      padding: 10px;
      margin: 0 0 5em;
      /* margin-right: 2em; */
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .photo-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .photo-gallery {
    column-count: 2;
  }
}
</style>