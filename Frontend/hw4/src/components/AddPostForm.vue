<template>
    <div class="addpost-form">
        <div class="form">
            <h3>Add Post</h3>
            <div class="input-group">
                <label for="body" class="subtext">Body: </label>
                <textarea name="body" type="text" id="body" style="font-size:larger" required v-model="post.body"></textarea>
            </div>
            <button @click="addPost" class="addPost">Add</button>
        </div>
    </div>
  </template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        body: "",
        date: "", 
      },

    };
  },
  methods: {
    addPost() {
      console.log("Got addpost")
      const data = {
        body: this.post.body,
        date: new Date().toLocaleDateString(),
      };

      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Post added successfully");
            this.$router.push("/");
          } else {
            console.log("Failed to add post");
          }
        })
        .catch((error) => {
          console.error("Error adding post:", error);
        });
          },
        },
};
</script>

  <style scoped>
  .addpost-form {

    background-color: rgb(209, 255, 209);
    min-width: calc(5% + 60px);
    max-width: 330px;
    width: calc(60% + 30px);
    display: flex;
    justify-content: right;
    margin: auto;
    border-radius: 15px;
    height:200px;
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
