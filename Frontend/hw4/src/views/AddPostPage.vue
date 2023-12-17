<template>
    <div class="filling">
      <AddPostForm />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
import AddPostForm from '@/components/AddPostForm.vue'

  export default {
    
    components: {
    AddPostForm
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