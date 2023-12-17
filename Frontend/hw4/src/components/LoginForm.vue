<template>
    <div class="login">
      <div class="form">
              <h3>Login</h3>
              <div class="input-group">
                  <label for="email" class="subtext">Email: </label>
                  <input name="email" type="email" required v-model="email"/>
              </div>
              <div class="input-group">
                <label for="password" class="subtext">Password: </label>
                <input name="password" type="password" required v-model="password"/>
              </div>
              <button @click='this.$router.push("/signup")'>Sign Up</button>or 
              <button @click="LogIn()">Login</button>
          </div>
    </div>
  </template>
  
  <script>
  export default {
  name: "LogIn", 
  
  data: function() {
      return {
     email: '',
     password: '',
    }
    },
    methods: {
  
  
  LogIn() {
        var data = {
          email: this.email,
          password: this.password
        };
        // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include', //  Don't forget to specify this if you need cookies
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        this.$router.push("/");
        location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
      },
    }, 
    }
  
  </script>
  
  <style scoped>
  .login {
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
  padding: 5px 5px; 
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
  margin-top: 15px;
  margin-right: 7px;
  margin-left: 7px;
  /* Add button styles */
  }
  input{
  border: none;
  }
  </style>
  