<template>
    <div class="filling">
      <SignUpForm/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
import SignUpForm from '@/components/SignUpForm.vue'

  export default {
    
    components: {
    SignUpForm
  }
  };
  </script>
  
  <style scoped>
.filling {
  padding-top: 30px;
  background-color: rgb(158, 158, 158); 
  height: calc(100vh - 180px);
  width: 100%;

}
  </style>