<template>
  <div id="home-page">
    <article-card v-for="post of posts"
                  :key="post.slug"
                  :format="format"
                  :post="post"
                  @photo-zoom-in="showPhotoDetail"></article-card>
    <el-dialog :visible.sync="modal.isShown" width="min-content">
      <img class="modal-picture" :src="modal.url" :alt="modal.url" @click="modal.isShown = false" />
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.modal-picture {
  max-width: 950px;
  min-width: 150px;
  min-height: 100px;
  cursor: zoom-out;
}
</style>

<script lang="ts" src="./home.page.ts"></script>

