<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        <router-link  to="/">
          <img alt="logo" src="./assets/piqtour_logo_small.png">
        </router-link>
        <div style="padding: 0px 10px">
          <h1 id="slogan">Touring the Wonders of the World Through Picture!</h1>
          <div id="links">
            <router-link  to="/">Home</router-link>
            <router-link  to="/gallery">Gallery</router-link>
            <router-link  to="/collage">Collage</router-link>
            <router-link  to="/dashboard">Account Dashboard</router-link>
          </div>
        </div>
      </div>
    </div>
    <notifications/>
    <router-view/>
    <div id="footer">
        <p>This website was made by Grant Lewis. View the GitHub repository <a
                href="https://github.com/grantslewis/Piqtour" target="_blank">
                here.</a>
                <br>
                Time Spent on Lab: 20 hours
        </p>
    </div>
  </div>
</template>


<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    
  },
  data() {
    return {
      photo: {},
      previous: {},
      current: this.photo.id,
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
})
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  flex-direction: row;
  align-content: center;
  /* background: #42b983; */
  padding: 5px;
  margin: 0px;
  background-color: azure;
  box-shadow: 0 6px 16px -1px rgb(0 0 0 / 13%);
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #5170FF;
}

#nav a:hover {
  color: #5CE1E6;
}

#logo {
  display: flex;
  align-content: center;
  padding: 0px 10px 0px 7px;
  width: 100%;
}

#logo img {
  width: 100%;
}

#slogan {
  padding: 0px;
  text-align: right;
  font-size: 0.8em;
  width: 100%;
  color: rgb(0,74,171);
  margin: auto;
}

#links {
  padding: 5px 5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

#footer {
  display: flex;
  height: 50px;
  padding: 10px;
  margin: 0px;
  background-color: azure;
  text-align: center;
  align-content: center;
  justify-content: center;
}


@media (min-width: 500px) {
  #logo {
    padding: 0px 30px 0px 20px;
  }

  #nav {
    padding: 10px;
  }

  #slogan {
    /* margin: 0px 10px; */
    padding: 0px;
    text-align: center;
    font-size: 1.85em;
  }
}

</style>
