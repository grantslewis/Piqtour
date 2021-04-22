<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <form class="pure-form" @submit.prevent="upload">
        <legend>Upload a picture</legend>
        <fieldset>
            <input v-model="title" placeholder="Title">
        </fieldset>
        <fieldset v-if="locationIdProvided == false">
            <legend>Select a Location:</legend>
            <input v-model="findTitle" placeholder="Search">
            <div class="suggestions" v-if="suggestions.length > 0">
                <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectLocation(s)">{{s.title}}
                </div>
            </div>

        </fieldset>
        <fieldset>
          <textarea v-model="review" placeholder="Description"></textarea>
        </fieldset>
        <fieldset>
          <div class="imageInput" @click="chooseImage">
            <img v-if="url" :src="url" />
            <div v-if="!url" class="placeholder">
              Choose an Image
            </div>
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <p v-if="error" class="error">{{error}}</p>
        </fieldset>
        <fieldset class="buttons">
          <button type="button" @click="close" class="pure-button">Close</button>
          <button type="submit" class="pure-button pure-button-primary right">Upload</button>
        </fieldset>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Uploader',
    props: {
        show: Boolean,
        locationId: String
    },
    data() {
        return {
            locationIdProvided: false,
            title: '',
            review: '',
            url: '',
            file: null,
            error: '',
            findTitle: '',
            findLocation: null,
            locations: [],
        }
    },
    created() {
        this.checkLocationIdProvided();
    },
    computed: {
        suggestions() {
            let locations = this.locations.filter(location => location.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
            return locations.sort((a, b) => a.title > b.title);
        }
    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },
        close() {
            this.$emit('close');
        },
        chooseImage() {
            this.$refs.fileInput.click()
        },
        async upload() {
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name);
                formData.append('title', this.title);
                formData.append('review', this.review);
                await axios.post("/api/photos/" + this.locationId, formData);
                this.file = null;
                this.url = "";
                this.title = "";
                this.review = "";
                this.$emit('uploadFinished');
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
        },
        async getLocations() {
            try {
                let response = await axios.get("/api/locations/all");
                this.locations = response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        selectLocation(location) {
            this.findTitle = location.title;
            this.findLocation = location;
            this.locationId = location._id;
        },
        checkLocationIdProvided() {
            if (this.locationId != '') {
                this.locationIdProvided = true;
            } else {
                this.getLocations();
            }
        },
    },
}
</script>

<style scoped>

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}


/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 50%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Form */

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