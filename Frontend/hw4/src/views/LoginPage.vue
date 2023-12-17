<template>
  <div class="filling">
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  
  components: {
    LoginForm
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