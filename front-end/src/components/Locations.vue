<template>
<div>
  <section class="location-gallery">
    <div class="location" v-for="location in locations" v-bind:key="location._id">
      <router-link class="locationLink" :to="{ name: 'Location', params: { id: location._id }}">
          <h4>{{location.title}}</h4>
        <GmapMap
            class="map"
            :center='locationPosition(location)'
            :zoom='10'
            :options="{
                zoomControl: false,
                mapTypeControl: false,
                draggable: false,
                scaleControl: false,
                scrollwheel: false,
                navigationControl: false,        
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
            }"
            style='height: 200px;'
        >
        <!-- width: 200px; border-radius: 20px; -->
            <GmapMarker
                :position="locationPosition(location)"
                @click="center=locationPosition(location)"
            />
        </GmapMap>
      </router-link>
      

      <div class="locationInfo">
        <p class="locationName">{{location.user.firstName}} {{location.user.lastName}}</p>
        <p class="locationDate">{{formatDate(location.created)}}</p>
      </div>
      <p class="photoCount">{{photoCount(location._id)}} Posts About This Location</p>
    </div>
  </section>
</div>
</template>

<script>
//  :center='locationPosition(location)'
//         :zoom='10'
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Locations',
  props: {
    locations: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    locationPosition(location) {
        var latval = parseFloat(location.lat);
        var lngval = parseFloat(location.lng); 
        let position = { lat: latval, lng: lngval };
        return position;        
    },
    async photoCount(locationId) {
        try {
            const response = await axios.get('/api/photos/all/' + locationId);
            return response.data.length;
        } catch (error) {
            console.log(error);
        }
    }
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
.locationInfo {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  /* font-size: 0.8em; */
  font-size: 1.1em;
}

.locationInfo p {
  
  margin: 0px;
}

.locationLink a {
    text-decoration: none;

}

.location a {
    text-decoration: none;
    color:#004AAB;
}

a:hover .map {
    box-shadow: 10px 5px 5px rgb(144, 140, 140);
}

a:hover {
    color: #5170FF;
}

/* a:hover .map {
    box-shadow: 10px 5px 5px grey;
} */

/* .locationDate {
  font-size: 0.7em;
  font-weight: normal;
} */

/* .location {
    width: 200px;
    height: 300px;
    
} */

/* .map {
    
    -webkit-border-radius:20px;
    -moz-border-radius: 20px;
    -webkit-transform: translate3d(0px, 0px, 0px);

} */

.location-gallery {
  column-gap: 1em;
}

.location {
  margin: 0 0 1.5em;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.image img , router-link{
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
  .location-gallery {
    column-count: 4;
    /* margin-left: 2em; */
    justify-content: space-evenly;
  }
  .location {
      padding: 10px;
      margin: 0 0 5em;
      /* margin-right: 2em; */
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .location-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .location-gallery {
    column-count: 2;
  }
}
</style>