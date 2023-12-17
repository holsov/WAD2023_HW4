<template>
    <div class="filling">
      <APostForm />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
import APostForm from '@/components/APostForm.vue'

  export default {
    
    components: {
    APostForm
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