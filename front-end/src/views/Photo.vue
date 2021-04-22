<template>
<div class="photoView">
    <router-link class="locationLink" :to="{ name: 'Location', params: { id: photo.location._id }}">
        <i class="fas fa-angle-left fa-2x"></i> <h2>Back to Location</h2>
    </router-link>

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
                <div class="helpUnhelp"> 
                    <i class="far fa-thumbs-up" @click="addHelpful(comment._id)"></i>
                    <i class="far fa-thumbs-down" @click="addUnhelpful(comment._id)" ></i>
                </div>
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
  name: 'Photo',
  data() {
    return {
      photo: null,
      comments: [],
      newComment: '',
      error: '',
      helpfulSelected: false,
      unhelpfulSelected: false,
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
        let response = await axios.get("/api/photos/photo/" + this.$route.params.id);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getComments() {
        try {
            this.response = await axios.get("/api/comments/" + this.$route.params.id);
            this.comments = this.response.data.reverse();
        } catch (error) {
            this.error = error.response.data.message;
        }
    },
    async addComment() {
        await axios.post("/api/comments/" + this.$route.params.id, {
            comment: this.newComment,
        });
        this.newComment = "";
        this.getComments();
        this.$emit('commentAdded');
    },
    alreadyLikedCheck(isHelpful, commentId) {
        if (this.helpfulSelected === true && this.type !== isHelpful) {
            this.addHelpful(commentId, -1);
            this.helpfulSelected = false;
            this.unhelpfulSelected = true;
            this.addUnhelpful(commentId, 1);
        } else if (this.unhelpfulSelected === true && this.type === isHelpful) {
            this.addUnhelpful(commentId, -1);
            this.unhelpfulSelected = false;
            this.helpfulSelected = true;
            this.addHelpful(commentId, 1);
        } else if (this.unhelpfulSelected === false && this.helpfulSelected === false) {
            if (isHelpful === true) {
                this.helpfulSelected = true;
                this.addHelpful(commentId, 1);
            } else {
                this.unhelpfulSelected = true;
                this.addUnhelpful(commentId, 1);    
            }
        }

    },
    async addHelpful(commentId ) { // incrament
        // Add incrament to body!!!!
        await axios.put("/api/comments/helpful/" + commentId);
        
    },
    async addUnhelpful(commentId) { // incrament
        // Add incrament to body!!!!
        await axios.put("/api/comments/unhelpful/" + commentId);
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

.locationLink {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: #004AAB;
    align-content: center;
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