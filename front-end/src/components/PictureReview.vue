<template>
<div class="photoView">
    <div class="image"> 
        <img :src="photo.path" />
        <div class="photoInfo">
            <p class="photoTitle">{{photo.title}}</p>
            <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
        </div>
        <p class="photoDate">{{formatDate(photo.created)}}</p>
        <p class="photoDesc">{{photo.description}}</p>
    </div>
    <br>
    <div class="comments">
        <div class="newComment" v-if="user"> 
            <p class="commentInfo">Add a New Comment:</p>
            <div class="newCommentForm">
                <form class="pure-form" @submit.prevent="addComment">
                    <fieldset>
                    <textarea v-model="newComment" placeholder="New Comment"></textarea>
                    </fieldset>
                    <fieldset class="buttons">
                    <button type="submit" class="pure-button pure-button-primary right">Add Comment</button>
                    </fieldset>
                </form>
                </div>
        </div>
        <p class="photoInfo">Comments:</p>
        <br>
        <div v-for="comment in comments" v-bind:key="comment._id">
            <div class="commentInfo">
                <p class="commentName">{{comment.user.firstName}} {{comment.user.lastName}}</p>
                <p class="commentDate">{{formatDate(comment.created)}}</p>
            </div>
            <p class="commentDesc">{{comment.comment}}</p>
            <hr>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'PictureReview',
  props: {
      photoId: String,
  },
  data() {
    return {
      photo: null,
      comments: [],
      newComment: '',
      error: '',
    }
  },
  async created() {
    this.getPhoto();
    this.getComments();
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/" + this.photoId); //$route.params.id
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getComments() {
        try {
            this.response = await axios.get("/api/comments/" + this.photoId); //this.$route.params.id
            this.comments = this.response.data.reverse();
        } catch (error) {
            this.error = error.response.data.message;
        }
    },
    async addComment() {
        // const formData = new FormData();
        // formData.append('comment', this.newComment);
        await axios.post("/api/comments/" + this.photoId, { //this.$route.params.id
            comment: this.newComment,
        });
        this.newComment = "";
        this.getComments();
        this.$emit('commentAdded');
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
}
</script>

<style scoped>
.photoView {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 2em;
}

.commentInfo {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 1em;
  font-weight: normal;
}

p {
    font-size: 1em;
    margin: 0px;
}

/* Masonry on large screens */
@media only screen and (min-width: 768px) {
    .photoView {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }
}


</style>