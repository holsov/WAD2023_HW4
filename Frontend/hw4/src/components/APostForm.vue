<template>
    <div class="apost-form">
        <div class="form">
            <h3>A Post</h3>
            <div class="input-group">
                <label for="body" class="subtext">Body: </label>
                <textarea name="body" type="text" id="body" style="font-size:larger" required v-model="post.body"></textarea>
            </div>
            <div class="input-group">
                <button @click="alterPost" class="button1">Update</button>
                <button @click="deletePost" class="button">Delete</button>
            </div>
            
        </div>
    </div>
  </template>

<script>
export default {
  name: "APost",
  data() {
    return {
      post: {
        body: "",
        date: "", 
      },

    };
  },
  methods: {
    fetchAPost(id) {
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    alterPost() {
        const id = this.$route.params.id; // Get the id from the current route

        if (!id) {
            console.error('No id found in the route.');
            return;
        }

        const data = {
            body: this.post.body,
            date: new Date().toLocaleDateString(),
        };

        fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
            console.log(response.data);
            this.$router.push("/"); // Navigate to the home page after the update
            })
            .catch((e) => {
            console.log(e);
            });
        },
        deletePost() {
  const id = this.$route.params.id;

  if (!id) {
    console.error('No id found in the route.');
    return;
  }

  fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete post with id ${id}`);
      }
      console.log(`Post with id ${id} deleted successfully`);
      return response.json(); 
    })
    .then((data) => {

      console.log(data);
      this.$router.push("/");
    })
    .catch((error) => {
      console.error(error);

    });
},
  },
  mounted() {
    // call fetchAPost() when this element mounts, and pass to it a route parameter  (id)
    // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their 
    // position in the URL. The captured values are populated in the req.params object, with the name 
    // of the route parameter specified in the path as their respective keys
    this.fetchAPost(this.$route.params.id);
  },

};
</script>

  <style scoped>
  .apost-form {

    background-color: rgb(209, 255, 209);
    min-width: calc(5% + 60px);
    max-width: 330px;
    width: calc(60% + 30px);
    display: flex;
    justify-content: right;
    margin: auto;
    border-radius: 15px;
    height:220px;
  }
  div.input-group {
    display: flex;
    justify-content: space-between; 
    justify-content: right;
    padding: 15px 5px; 
  }
  .subtext {
    font-size: x-large;
    padding-right: 10px;
  }

  .input-group label {
    display: block;
  }

  .input-group input {
    display: flex;
    width: 60%;
    max-width: 165px;
    padding: 0.5rem;
    border-radius: 15px;
  }

  button {
    border-radius: 10px;
    background-color: rgb(124, 150, 209);
    border: none;
    font-size: x-large;
    width: max-content;
    margin-top: 30px;

  }
  input{
    border: none;
  }
  </style>
