<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="hua">dsjdkjdsjd</div>
  <router-view />
</template>
<script>
// import "@/assets/css/1.css";
</script>

<style>
@import "@/assets/css/1.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

.hua {
  color: var(--my);
}
</style>
