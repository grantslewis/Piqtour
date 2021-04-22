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
        <div v-if="user">
            <p class="option"><a @click="togglePhoto">
                <i class="fas fa-plus fa-2x" style="padding-right: 5px;"></i>
                <i class="fas fa-image fa-2x"></i>
            </a></p>
            <uploader :locationId="location._id" :show="showPhoto" @close="close" @uploadFinished="uploadFinished"/>
        </div>
        
        <photos :photos="photoList" />
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
    margin: 20px;
    display: flex;
    justify-content: left;
}
</style>
