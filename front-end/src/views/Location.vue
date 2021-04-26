<template>
    <div>
        <GmapMap
            class="map"
            :center='locationPosition'
            :zoom='10'
            style='width: 100%;  height: 250px;'
        >
            <GmapMarker
                :position="locationPosition"
                @click="center=locationPosition"
            />
        </GmapMap>
        
    

        <div class="content">


            <div class="option">
                <h2>Description of Location:</h2>
                <div v-if="user">
                    <p class="adder"><a @click="togglePhoto">
                        <i class="fas fa-plus fa-2x" style="padding-right: 5px;"></i>
                        <i class="fas fa-image fa-2x"></i>
                    </a></p>
                    <!-- class="option" -->
                    <uploader :locationId="location._id" :show="showPhoto" @close="close" @uploadFinished="uploadFinished"/>
                </div>
            </div>
            <p class="desc">{{location.description}}</p>
            <br>
            <h2>Activities to Tour:</h2>
            <photos :photos="photoList" />
        </div>
        
    </div>
</template>


<script>
import axios from 'axios';
import Photos from '../components/Photos.vue'
import Uploader from '../components/Uploader.vue';
export default {
    name: 'Location',
    data() {
        return {
            marker: null,
            location: null,
            locationPosition: [],
            showPhoto: false,
            photoList: [],
        }
    },
    components: {
        Uploader,
        Photos,
    },
    async created() {
        this.getLocation();
        this.getPhotos();
        try {
        let response = await axios.get('/api/users');
            this.$root.$data.user = response.data.user;
        } catch (error) {
            this.$root.$data.user = null;
        }
    },
    methods: {
        async getLocation() {
            try {
                const response = await axios.get('/api/locations/' + this.$route.params.id);
                this.location = response.data;

                var latval = parseFloat(this.location.lat);
                var lngval = parseFloat(this.location.lng); 
                let position = { lat: latval, lng: lngval };
                this.locationPosition = position

            } catch (error) {
                console.log(error);
            }
        },
        async getPhotos() {
            try {
                const response = await axios.get('/api/photos/all/' + this.$route.params.id);
                this.photoList = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        togglePhoto() {
            this.showLocation = false;
            this.showPhoto = true;
        },
        close() {
            this.showPhoto = false;
            this.showLocation = false;
        },
        uploadFinished() {
            this.showPhoto = false;
            this.showLocation = false;
            this.getPhotos();
        },
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
}
</script>

<style>
.option {
    display: flex;
    justify-content: space-between;
    align-content: end;
}

h2 {
    display: flex;
    justify-content: start;
}

p .desc {
    text-align: start;
  /* display: flex; */
  /* justify-content: start; */
    font-size: 1.2em;
    margin-left: 20px;
    margin-right: 20px;
}

p .adder {
    margin-right: 20px;
}

.adder:hover {
    color: rgb(0,74,171);
}

.content {
    margin: 20px;
}

@media (min-width: 720px) {
    .content, p .desc {
        margin-left: 40px;
        margin-right: 40px;
    }
}

</style>
