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
    </p>

    <!-- photos -->
    <div class="box photos" v-if="post.photos && post.photos.length && showPhotos">
      <el-carousel arrow="always">
        <el-carousel-item v-for="url of post.photos" :key="url">
          <div class="photo-wrapper" :style="imageWrapperStyles(url)"
               @click="$emit('photo-zoom-in', { url: url, post: post })">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- cover -->
    <div class="box cover" v-else-if="!post.content && post.cover && showPhotos && shouldRenderCover">
      <div class="photo-wrapper" :style="imageWrapperStyles(post.cover)"
           @click="$emit('photo-zoom-in', { url: post.cover, post: post })">
      </div>
    </div>

    <!-- description -->
    <detailable-content v-if="post.excerpt" :html="post.excerpt"></detailable-content>
    <detailable-content v-else-if="post.content" :html="post.content"></detailable-content>

    <div class="categories-and-tags">
      <div v-if="lastCategory.length" class="categories">
        <i class="fa fa-bookmark" aria-hidden="true"></i>
        <router-link :to="{ name: 'related-posts-page', params: { type: 'category', slug: lastCategory } }">
          <span>{{ lastCategory }}</span>
        </router-link>
      </div>

      <!-- tags -->
      <div class="tags" v-if="post.tags && post.tags.length">
        <i class="fa fa-hashtag" aria-hidden="true"></i>
        <router-link v-for="tag of post.tags" :key="tag.path"
                     :to="{ name: 'related-posts-page', params: { type: 'tag', slug: tag.name }}">
          <span>{{ tag.name }}</span>
        </router-link>
      </div>
    </div>

    <!-- read more -->
    <el-button v-if="post.excerpt" class="more" size="mini" type="primary"
               @click="$router.push({ name: 'post-page', params: { slug: post.slug }})">
      More
    </el-button>
    <end-of-file v-else></end-of-file>

  </div>
</template>

<style lang="scss" scoped>
  @import '../../../styles/vars.scss';

  .article-card {
    text-align: center;
    border-bottom: 1px solid $--post-divide-line-color;
    word-break: keep-all;
    word-wrap: break-word;
    padding-bottom: 2rem;
    margin-bottom: 2rem;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    > * {
      margin-top: 0;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      .external-link {
        font-size: 0.8em;
      }
    }

    .meta {
      font-size: 0.9rem;
    }

    .description {
      line-height: 1.5;
    }

    .cover,
    .photos {
      padding: 5px;
      border: 1px solid mix($--white, $--primary-color, 80%);
      background-color: white;

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
          border-bottom-color: mix($--white, $--primary-color, 30%);
        }
      }
    }

    .title {
      a {
        border-bottom: .1rem solid rgba(0, 0, 0, 0);
        transition: all 200ms;
        &:hover {
          border-bottom-color: mix($--white, $--primary-color, 30%);
        }
      }
    }

    .categories-and-tags {
      font-size: 0.9rem;
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      > * {
        margin-right: 1rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .box {
      box-shadow: 0 0 0.1rem mix($--white, $--primary-color, 40%);
      transition: box-shadow 250ms;
      margin: 0 -3rem 1rem -3rem;
      @media (max-width: $--small-screen-width) {
        margin: 0 -1rem 1rem -1rem;
      }

      &:hover {
        box-shadow: 0 0 0.3rem mix($--black, $--primary-color, 30%);
      }
    }

    .more {
      font-size: .8rem;
    }
  }
</style>

<style lang="scss">
  @import '../../../styles/vars.scss';

  .el-button {
    font-family: $--basic-font-family;
  }
</style>

<script lang="ts" src="./article-card.component.ts"></script>


