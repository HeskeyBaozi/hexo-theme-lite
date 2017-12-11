<template>
  <div id="home-page">
    <article-card v-for="post of posts" 
                  :key="post.slug" 
                  :format="format" 
                  type="card"
                  :post="post"></article-card>
  </div>
</template>

<style lang="less" scoped>

</style>

<script lang="ts" src="./home.page.ts"></script>

