<template>
  <div>
    <div>
      <GmapAutocomplete
        @place_changed.passive='setPlace'
        style="margin-bottom: 10px"
      />
      <!-- <button
        @click='addMarker'
      >
        Add
      </button> -->
    </div>
    <br>
    <GmapMap
      class="map"
      :center='center'
      :zoom='12'
      style='width:100%;  height: 400px;'
    >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
        />
    </GmapMap>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'GoogleMap',
  data() {
    return {
      sights: [],
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
    }
  },
  created() {
    // this.getSights();
    // this.loadMarkers();
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    // async getSights() {
    //   try {
    //     let response = await axios.get("/api/sights");
    //     this.sights = response.data;
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // loadMarkers(){
      
    // },
    setPlace(place) {
      this.currentPlace = place;
      this.addMarker();
      this.$emit('position', this.center);
      this.$emit('setPlace', this.currentPlace);
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        // this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
}
</script>


<style>

.map {
  width: 100%;
  height: 300px;
}

@media (min-width: 720px) {
  .map {
    height: 400px;
  }
}

</style>
