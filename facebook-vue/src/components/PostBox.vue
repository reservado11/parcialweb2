<template>
  <div class="post-box">
    <textarea v-model="newPost" placeholder="¿Qué estás pensando?" class="post-input"></textarea>
    <button @click="addPost" class="post-btn">Publicar</button>

    <div class="post-list">
      <div v-for="(post, index) in posts" :key="index" class="post-item">
        <strong>Reservado dice:</strong>
        <p>{{ post }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostBox',
  data() {
    return {
      newPost: '',
      posts: []
    }
  },
  methods: {
    addPost() {
      if (this.newPost.trim() !== '') {
        this.posts.unshift(this.newPost)
        this.newPost = ''
      }
    }
  }
}
</script>

<style scoped>
.post-box {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
}

.post-input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  resize: none;
}

.post-btn {
  background-color: #3b5998;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
}

.post-btn:hover {
  background-color: #324b85;
}

.post-item {
  background-color: #f0f2f5;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
