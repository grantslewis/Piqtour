<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        <router-link  to="/">
          <img alt="logo" src="./assets/piqtour_logo_small.png">
        </router-link>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <div id="footer">
        <p>This website was made by Grant Lewis
          <br>View the GitHub repository <a
                href="https://github.com/grantslewis/Piqtour" target="_blank">
                here.</a>
        </p>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
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
  background: #42b983;
  padding: 5px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#logo {
  display: flex;
  padding: 0px 10px 0px 7px;
  max-width: 75%;
}

#logo img {
  /* display: block;
  margin: auto; */
  /* background-size: conatin; */
  width: 100%;
  /* width: auto;
  height: auto; */
  max-height: 100vh;
  /* padding: 10px; */
  /* object-fit: contain; */
}


@media (min-width: 500px) {
  #logo {
    padding: 0px 30px 0px 20px;
  }

  #nav {
    padding: 10px;
  }
}

</style>

// <script>
// import mock from './mock-data.json'

// export default {
//   data() {
//     return {
//       photoinfo: mock,
//     }
//   }
// }
// </script>
