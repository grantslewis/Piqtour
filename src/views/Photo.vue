<template>
<div class="photo-wrapper">
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
    }
  },
  created() {
    this.photo = this.$root.$data.images.find(photo => photo.id === parseInt(this.$route.params.id));
  },
}
</script>



<style scoped>
.photo-wrapper {
    padding: 5px;
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