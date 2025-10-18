<template>
  <nav class="nav-tabs">
    <router-link to="/" class="tab" active-class="active">Muro</router-link>
    <router-link to="/info" class="tab" active-class="active">Info</router-link>
    <router-link to="/photos" class="tab" active-class="active">Fotos</router-link>
    <router-link to="/boxes" class="tab" active-class="active">Cajas</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavTabs'
}
</script>

<style scoped>
.nav-tabs {
  display: flex;
  justify-content: center;
  background-color: #f5f6f7;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 15px 25px;
  text-decoration: none;
  color: #555;
  font-weight: bold;
}

.tab:hover {
  background-color: #ddd;
}

.active {
  border-bottom: 3px solid #3b5998;
  color: #3b5998;
}
</style>
