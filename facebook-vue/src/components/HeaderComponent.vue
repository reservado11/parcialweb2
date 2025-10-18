<template>
  <header class="header">
    <div class="logo">Facebook Vue</div>
    <input type="text" placeholder="Buscar..." class="search-bar" />
    <div class="user-section">
      <img src="/img/perfil.jpg" alt="Perfil" class="profile-pic" />
      <span class="username">Reservado</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3b5998;
  color: white;
  padding: 10px 20px;
}

.logo {
  font-weight: bold;
  font-size: 20px;
}

.search-bar {
  width: 40%;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
}

.user-section {
  display: flex;
  align-items: center;
}

.profile-pic {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
