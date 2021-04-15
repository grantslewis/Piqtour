<template>
    <div>
        <flicking v-if="isFetching === false" 
            :options="{ gap: 10, moveType: 'freeScroll'}"
            @need-panel="e => {}"
            @move-end="e => {}"
            style="height: 120px"
        > 
            <!-- :plugins="plugins" 
            :tag="'div'"
            :viewportTag="'div'"
            :cameraTag="'div'"
            -->
            <div>Words</div>
            <!-- <div class="panel" v-for="word in test" :key="word"><p>{{word}}</p></div> -->
            <div class="panel" v-for="image in images" :key="image._id"> <img :src="image.path"/></div>
            <div>Me</div>
        </flicking>
    </div>
</template>

<script>
import { Flicking } from "@egjs/vue-flicking";
import moment from 'moment';
export default {
    name: 'Carousel',
    props: {
        images: Array,
        isFetching: Boolean,
    },
    methods: {
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
        }
    },
    components: {
        Flicking: Flicking,
    },
}
</script>