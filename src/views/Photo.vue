<template>
<div class="photo-wrapper">
    <div class="photo-wrapper">
        <img class="photo" :src="'/images/'+photo.image" />
        <div class="info-wrapper">
            <div class="titles">
                <h3>
                Title: <br />
                Photographer: <br />
                Location: <br />
                Date Taken:
                </h3>
            </div>
            <div class="info">
                <h3>
                {{photo.inspirational_title}}<br />
                {{photo.first_name}} {{photo.last_name}}<br />
                {{photo.city}}, {{photo.country}}<br />
                {{photo.date_taken}}
                </h3>
            </div>
            <!-- <h3 class="info">
                Title: &emsp; {{photo.inspirational_title}}<br />
                Photographer:           {{photo.first_name}} {{photo.last_name}}<br />
                Location: <span class="tab"/> {{photo.city}}, {{photo.country}}<br />
                Date Taken:   {{photo.date_taken}}</h3> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      photo: {},
    }
  },
  created() {
    this.photo = this.$root.$data.images.find(photo => photo.id === parseInt(this.$route.params.id));
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

.photo-wrapper {
    padding: 10px;
    height: 100%;
    width: 100%;
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
}

.info-wrapper {
    display: flex;
    flex-direction: row;
    text-align: right;

}

.titles {
    margin-right: 20px;
    color: #717171;
}

.info {
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

/* .info h2, .info h3 {
    text-align: left;
    margin: 2px;    
}
h2.title {
    margin-bottom: 15px !important;
}

h3 {
    color: #5f5f5f;
} */

@media (min-width: 500px) {
  .photo-wrapper {
    padding: 10px 120px;
  }
}

</style>