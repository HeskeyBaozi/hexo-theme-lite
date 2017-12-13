<template>
  <div class="article-card">

      <!-- title -->
      <h1 class="title">
        <a v-if="post.link && post.link.length" :href="post.link" target="_blank">
          <span>{{ post.title || 'Untitled' }}</span>
          <i class="fa fa-link external-link" aria-hidden="true"></i>
        </a>
        <router-link v-else :to="{ name: 'post-page', params: { slug: post.slug } }">
          <span>{{ post.title || 'Untitled' }}</span>
        </router-link>
      </h1>

      <!-- meta -->
      <p class="meta">
        <span class="create-time">{{ post.date | format(format)}}</span>
        <!-- todo: to one category -->
      </p>

      <!-- photos -->
      <div class="photos" v-if="post.photos && post.photos.length && showPhotos">
        <el-carousel arrow="always">
          <el-carousel-item v-for="url of post.photos" :key="url">
            <div class="photo-wrapper" @click="$emit('photo-zoom-in', { url: url, post: post })">
              <img :src="url" :alt="url" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- cover -->
      <div class="cover" v-else-if="post.cover && showPhotos">
        <div class="photo-wrapper" @click="$emit('photo-zoom-in', { url: post.cover, post: post })">
            <img :src="post.cover" :alt="post.cover" />
        </div>
      </div>

      <!-- description -->
      <p class="description">{{ postDescription }}</p>

      <div class="categories-and-tags">
        <div v-if="lastCategory.length" class="categories">
          <i class="fa fa-bookmark" aria-hidden="true"></i>
          <router-link :to="{ name: 'categories-page', query: { slug: lastCategory } }">
            <span>{{ lastCategory }}</span>
          </router-link>
        </div>

        <!-- tags -->
        <div class="tags" v-if="post.tags && post.tags.length">
          <i class="fa fa-hashtag" aria-hidden="true"></i>
          <!-- todo: to one tag -->
          <router-link v-for="tag of post.tags" :key="tag.path" :to="{ name: 'tags-page', query: { name: tag.name } }">
            <span>{{ tag.name }}</span>
          </router-link>
        </div>
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
  padding: 2rem 0;
  border-bottom: 1px solid lighten(#5c5c5c, 50%);

  &:last-child {
    border-bottom: none;
  }

  > * {
    margin-top: 0;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.meta {
  font-size: 0.9rem;
}

.external-link {
  font-size: 0.8em;
}

.description {
  line-height: 1.5;
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

.tags,
.categories {
  > * {
    margin-right: 0.5rem;
  }
}

.meta,
.categories-and-tags {
  a {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    transition: all 200ms;
    &:hover {
      border-bottom-color: #5c5c5c;
    }
  }
}

.meta,
.categories-and-tags {
  color: #5c5c5c;
}

.title {
  a {
    border-bottom-width: 2px;
  }
}

.categories-and-tags {
  font-size: 0.9rem;
  display: flex;
  > * {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

<script lang="ts" src="./article-card.component.ts"></script>


