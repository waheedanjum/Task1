<template>
  <div class="hello">
    <div class="row justify-content-center">
    <input type="search" v-model="artistName" placeholder="Enter artist name" />
    <button class="ml-1 col-1" v-on:click="searchAlbums">Search</button>
    </div>
    <div v-if="loading" class="mt-5 pt-5 row justify-content-center">
      <div v-if="loading" class="loader"></div>
    </div>
    <div v-else>
      <div v-if="this.albums">
        <div class="container">
          <input type="text" v-model="singerName" placeholder="Enter album name" />
          <div class="row justify-content-center d-flex mt-5 albums-row" >
            <div class="col-3 cntr" v-for="(album, index) in filteredList" :key="index">
              <div class="whitebox">
                <img :src="album.artworkUrl100" alt="" />
                <h4>{{ album.artistName }}</h4>
                <span>{{ album.collectionCensoredName }}</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Albums",
  data() {
    return {
      singerName: "",
      artistName: "",
      albums: null,
      loading: false
     
    };
  },
  methods: {
    searchAlbums: function () {
      this.loading= true
      axios({
      method: "get",
      url: `http://localhost:4000/albums/${this.artistName}`,
      }).then((res) => {
        this.albums = res.data;
        this.loading = false
        });
      }
  },
  
  computed: {
    filteredList() {
      return this.albums.filter(album => {
        return album.collectionCensoredName.toLowerCase().includes(this.singerName.toLowerCase())
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 10px ;
}
input {
  padding: 4px 12px;
  color: rgba(0,0,0,.70);
  border: 1px solid rgba(0,0,0,.12)
}
.col-3 {
  padding: 10px 12px;
}
.whitebox {
  box-shadow: 0 5px 15px 0 #0a568d26 !important;
  padding: 20px;
}
h4 {
  margin: 10px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
