<template>
  <div class="AllPosts">
    <div id="post-list">
      <div class="container">
    <button v-if = "authResult" @click="Logout" class="center">Logout</button>
    <button v-if = "authResult" @click="AddPost" class="center">Add post</button>
    <button v-if = "authResult" @click="DeleteAll" class="center">Delete all posts</button>
    </div>
      <ul>
        <div  class="item" v-for="post in posts" :key="post.id">
          <!-- / We are putting an anchor for each post, when we click on it, we will be directed to the specific post view (/apost/) /  -->
          <router-link :to="'api/apost/' + post.id" class="singlepost">
            <span class="date">{{ post.date }} </span>
            <span class="body"> {{ post.body }} </span>
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>


<script>
import auth from '../auth';
export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
      authResult: auth.authenticated()
    };
  },
  methods: {
     Logout() { // cntrl + shift + // to comment out after adding jws verificaton
      console.log("logout initiated")
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
     },
    fetchPosts() {
      fetch(`http://localhost:3000/api/posts/`,{
        credentials: 'include', 
            })
        .then((response) => response.json())
        .then((data) => {
          this.posts = data
          console.log("json that we got")
        })
        .catch((err) => console.log(err.message));
    },
    DeleteAll() {
      fetch("http://localhost:3000/auth/deleteall", {
          credentials: 'include', 
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        this.$router.push("/");
        location.reload(); 
      })
      .catch((e) => {
        console.log(e);
        console.log("error deleteing");
      });
    },
    AddPost(){
      try{
        this.$router.push("/addpost");}
      catch(e){
        console.log(e)
      }
    }
  },
  mounted() {
    // call fetchPosts() when this element (AllPosts) mounts 
    this.fetchPosts();
    console.log("mounted");
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.date{
  margin-left:auto
}
a {
  text-decoration: none;
  width:100%;
  display:flex;
  flex-flow: column;
}
a:hover {
  text-decoration: underline;
}
.item {
  display: flex;
  background: rgb(189, 212, 199);
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 10px;
}
#post-list {
  background: white;
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 50%;
}
#post-list ul {
  padding: 0;
}
#post-list li {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}
.AllPosts{
  background-color: gray ;
}
.container{
  display:flex;
  flex-flow: row;
  justify-content: space-around;
}
button{ /* w3 default button styling */
  background-color: #42b983; /* vue green :) */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
button:hover{
  background-color: #28895d;
}
</style>