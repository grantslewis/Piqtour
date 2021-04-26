<template>
<div class="photoView">
    <br>
    <router-link class="locationLink highlightable" :to="{ name: 'Location', params: { id: photo.location._id }}">
      <i class="fas fa-angle-left fa-2x"></i> <h2>Back to Location</h2>
    </router-link>
    <div class="image"> 
        <img class="photo" :src="photo.path" />
        <!-- <div class="photobg" style="background-image: url('photo.path');"/> -->
        <div class="photoInfo">
            <p class="photoTitle">{{photo.title}}</p>
            <p class="photoUserInfo">{{photo.user.firstName}} {{photo.user.lastName}} - {{formatDate(photo.created)}}</p>
        </div>
        <!-- <p class="photoDate">{{formatDate(photo.created)}}</p> -->
        <hr>
        <br>
        <p style="font-size: 1.5em;">Review:</p>
        <p class="desc">{{photo.review}}</p>
        <br>
        <hr>
        <br>
    </div>
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
        <!-- <hr>
        <br> -->
        <div class="existingComments">
          <p style="font-size: 1.5em;">Comments:</p>
          <br>
          <div v-for="comment in comments" v-bind:key="comment._id">
              <div class="commentUserInfo">
                <p class="commentName">{{comment.user.firstName}} {{comment.user.lastName}}</p>
                <p class="commentDate">{{formatDate(comment.created)}}</p>
              </div>
              <div class="commentInfo">
                  <div class="helpUnhelp">
                      <div class="helpful highlightable" style="margin-right: 8px;"  @click="addHelpful(comment._id)">
                        <!-- v-if="comment.helpful > 0" -->
                        <p>{{comment.helpful}} <i class="far fa-thumbs-up" style="margin-left: 3px;"></i></p>
                      </div> 
                      <div class="unhelpful highlightable" @click="addUnhelpful(comment._id)">
                        <p><i class="far fa-thumbs-down" style="margin-right: 3px;"></i>{{comment.unhelpful}}</p>
                      </div>                  
                  </div>
                  <p class="descComment">{{comment.comment}}</p>
                  <div v-if="user._id == comment.user._id" class="highlightable" @click="removeComment(comment._id)">
                    <i class="fas fa-trash-alt" style="margin-left: 10px; font-size: 1.3em;"></i>
                  </div>         
              </div>
              <hr>
              <br>
          </div>
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
            let response = await axios.get("/api/comments/" + this.$route.params.id);
            this.comments = response.data.reverse().sort((a,b) => (b.helpful-b.unhelpful)-(a.helpful-a.unhelpful))
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
    async removeComment(commentId) {
      await axios.delete("/api/comments/" + commentId);
      this.getComments();
      this.$emit('commentDeleted');
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
    async addHelpful(commentId) { // incrament
        // Add incrament to body!!!!
        await axios.put("/api/comments/helpful/inc/" + commentId);
        this.getComments();
        
    },
    async addUnhelpful(commentId) { // incrament
        // Add incrament to body!!!!
        await axios.put("/api/comments/unhelpful/inc/" + commentId);
        this.getComments();
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

p {
  display: flex;
  justify-content: start;
  font-size: 1.2em;
}

hr {
  height: 1px;
  background-color: lightgrey;
  border: none;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 60%;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 1.7em;
}

.photoUserInfo {
  font-size: 1.0em;
}

.locationLink {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    justify-content: start;
    width: fit-content;
    margin-right: auto;
    color: #2C3E50;
    /* color: #004AAB; */
    align-content: center;
}


.commentInfo {
  display: flex;
  justify-content: start;
  font-size: 1em;
  margin-bottom: 5px;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 1em;
  font-weight: normal;
}

.comments {
  display: flex;

}

.commentUserInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
}

.helpUnhelp {
  display: flex;
  flex-direction: row;
  align-content: center;
  font-size: 1.2em;
}

.desc, .descComment {
    text-align: start;
  /* display: flex; */
  /* justify-content: start; */
    font-size: 1.2em;
    padding-left: 20px;
}

.descComment {
  margin-right: auto;
}

.desc {
  padding-right: 20px;
}

.highlightable:hover {
  color: #004AAB;
}


/* p {
    font-size: 1em;
    margin: 0px;
} */

/* Masonry on large screens */
@media only screen and (min-width: 768px) {
    .photoView {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
    }

    .desc, .descComment {
      padding-left: 40px;
    }

    .desc {
      padding-right: 40px;
    }
    
    .photo {
      width: 70%
    }
    /* .photo {
      height: 70vh;
      width: max-content;
    } */

    .photobg {
      width: 100%;
      height: 70vh;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .comments {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-content: flex-start;
      width: 100%;
    }

    .existingComments {
      width: 70%;
    }

    .addComment {
      width: 25%;
    }

}
</style>