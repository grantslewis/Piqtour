<template>
  <div class="home">
    <user-modification :isEditAllowed="isEditAllowed"/>
  </div>
</template>

<script>
import UserModification from '../components/userImage.vue'
export default {
  name: 'Edit',
  data() {
    return {
      isEditAllowed: true,
    }
  },
  components: {
    UserModification,
  },
}

</script>


<style>
.home {
  width: 100%;
  height: 100%;
}

.slide {
  width: 100vw;
  height: 90vh;
  display: none;

}


.image {
  width: auto;
  margin: auto;
  max-width: 100%;
  height: 80vh;
  margin-bottom: 10px;
  object-fit:cover;
}

@media (min-width: 500px) {
  .info-wrapper {
      font-size: 1.25em;
  }
  .titles {
      margin-right: 20px;
  }
  .image {
    max-width: auto;
    max-height: 80%;
  }
}


</style>
