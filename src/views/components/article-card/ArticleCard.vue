<template>
  <div class="article-card">

      <!-- title -->
      <h1 class="title">
        <a v-if="post.link && post.link.length" :href="post.link" target="_blank">
          <span>{{ post.title || 'Untitled' }}</span>
          <i class="fa fa-link external-link" aria-hidden="true"></i>
        </a>
        <router-link v-else :to="{ name: 'post-page', params: { slug: post.slug } }">
          {{ post.title || 'Untitled' }}
        </router-link>
      </h1>

      <!-- meta -->
      <p class="meta">
        <span class="create-time">{{ post.date | format(format)}}</span>
        <!-- todo: to one category -->
        <router-link v-if="lastCategory.length">{{ lastCategory }}</router-link>
      </p>

      <!-- photos -->
      <div class="photos" v-if="post.photos && post.photos.length">
        <el-carousel arrow="always">
          <el-carousel-item v-for="url of post.photos" :key="url">
            <div class="photo-wrapper" @click="$emit('photo-zoom-in', { url: url, post: post })">
              <img :src="url" :alt="url" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- cover -->
      <div class="cover" v-else-if="post.cover">
        <div class="photo-wrapper" @click="$emit('photo-zoom-in', { url: post.cover, post: post })">
            <img :src="post.cover" :alt="post.cover" />
        </div>
      </div>

      <!-- description -->
      <p class="description">{{ postDescription }}</p>

      <!-- tags -->
      <div class="tags" v-if="post.tags && post.tags.length">
        <i class="fa fa-slack" aria-hidden="true"></i>
        <!-- todo: to one tag -->
        <router-link v-for="tag of post.tags" :key="tag.path">
          {{ tag.name }}
        </router-link>
      </div>

      <!-- read more -->
      <el-button size="mini" type="primary" @click="$router.push({ name: 'post-page', params: { slug: post.slug }})">
        More
      </el-button>

  </div>
</template>

<style lang="less" scoped>
.article-card {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  text-align: center;
}

.external-link {
  font-size: 0.7em;
}

.cover,
.photos {
  padding: 5px;
  border: 1px solid #e3e3e3;
  background-color: white;
  width: calc(~"100% + 6rem");

  .photo-wrapper {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: zoom-in;
    > img {
      max-width: 100%;
    }
  }
}
</style>

<script lang="ts" src="./article-card.component.ts"></script>


