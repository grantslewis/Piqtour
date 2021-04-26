<template>
<transition v-if="show" name="modal">
  <form class="pure-form" @submit.prevent="addLocation">
        <h3>Add a New Location:</h3>
        <fieldset>
            <GoogleMap class="map" @setPlace="setPlace" @position="setPosition"/>
        </fieldset>
        <fieldset>
          <textarea v-model="description" placeholder="Description"></textarea>
        </fieldset>
        <fieldset class="buttons">
          <button type="button" @click="close" class="pure-button">Cancel</button>
          <button type="submit" class="pure-button pure-button-primary right">Add</button>
        </fieldset>
    </form>
</transition>
</template>

<script>
import axios from 'axios';
import GoogleMap from './GoogleMap.vue'
export default {
    name: 'LocationAdder',
    props: {
        show: Boolean,
    },
    data() {
        return {
        title: '',
        description: '',
        center: { lat: 45.508, lng: -73.587 },
        latstr: '',
        lngstr: '',
        currentPlace: null,
        locations: [],
        error: '',
        }
    },
    components: {
        GoogleMap
    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },
        setPlace(place) {
            this.currentPlace = place;
        },
        setPosition(position) {
            this.center = position;
            this.latstr = this.center['lat'].toString();
            this.lngstr = this.center['lng'].toString();
        },
        close() {
            this.$emit('close');
        },
        async addLocation() {
            try {
                await axios.post("/api/locations", {
                    title: this.currentPlace.formatted_address,
                    description: this.description,
                    lng: this.lngstr,
                    lat: this.latstr,
                    placeId: this.currentPlace.placeId,
                });
                
                this.title = "";
                this.description = "";
                this.currentPlace = null;
                this.$emit('uploadFinished');
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
        },
    },
}
</script>

<style scoped>

form {
  font-size: 11pt;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
}

.pure-form {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
}

.map {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: auto;
    margin-right: auto;
}

@media (min-width: 720px) {
  .pure-form {
    width: 50%;
  }
}

.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}

img {
  width: 200px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>