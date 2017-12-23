<template>
  <div class="detailable-page">
    <!-- title -->
    <h1 class="title">
      <a v-if="!isImplicit && target.link && target.link.length" :href="target.link" target="_blank">
        <span>{{ target.title || 'Untitled' }}</span>
        <i class="fa fa-link external-link" aria-hidden="true"></i>
      </a>
      <span v-else>{{ target.title || 'Untitled' }}</span>
    </h1>

    <!-- meta -->
    <p v-show="!isImplicit" class="meta">
      <span class="create-time">{{ target.date | format(date_format) }}, {{ target.date | format(time_format) }}</span>
    </p>

    <!--categories & tags-->
    <div v-if="!isImplicit" class="categories-and-tags">
      <div v-if="lastCategory.length" class="categories">
        <i class="fa fa-bookmark" aria-hidden="true"></i>
        <router-link :to="{ name: 'related-posts-page', params: { type: 'category', slug: lastCategory } }">
          <span>{{ lastCategory }}</span>
        </router-link>
      </div>

      <!-- tags -->
      <div class="tags" v-if="target.tags && target.tags.length">
        <i class="fa fa-hashtag" aria-hidden="true"></i>
        <router-link v-for="tag of target.tags" :key="tag.path"
                     :to="{ name: 'related-posts-page', params: { type: 'tag', slug: tag.name }}">
          <span>{{ tag.name }}</span>
        </router-link>
      </div>
    </div>

    <!-- photos -->
    <div class="box photos" v-if="target.photos && target.photos.length">
      <el-carousel arrow="always">
        <el-carousel-item v-for="url of target.photos" :key="url">
          <div class="photo-wrapper" @click="showPhotoDetail({ url: url, post: target })">
            <img :src="url" :alt="url"/>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- content -->
    <detailable-content :html="target.content"></detailable-content>

    <!--comment-->
    <div class="comments" v-if="target.comments">
      <div class="gitment">
        <gitment-comment :isImplicit="isImplicit"
                         :slugOrSource="isImplicit ? $route.path : `posts/${target.slug}`"></gitment-comment>
      </div>
    </div>

    <!--back to top-->
    <end-of-file></end-of-file>

    <el-dialog :visible.sync="modal.isShown" width="min-content">
      <img class="modal-picture" :src="modal.url" :alt="modal.url" @click="modal.isShown = false"/>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../styles/vars.scss';

  .detailable-page {
    text-align: center;

    > * {
      margin: 0 0 1rem 0;
      &:last-child {
        margin: 0;
      }
    }

    .title {
      font-size: 1.5rem;
      margin: 0 0 0.5rem 0;
      .external-link {
        font-size: 0.8em;
      }
    }

    .meta {
      font-size: 0.9rem;
    }

    .categories-and-tags {
      color: #5c5c5c;
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
      a {
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        transition: all 200ms;
        &:hover {
          border-bottom-color: #5c5c5c;
        }
      }
      .tags, .categories {
        > * {
          margin-right: 0.5rem;
        }
      }
    }

    .photos {
      padding: 5px;
      border: 1px solid lighten($--primary-color, 80%);
      background-color: white;
      margin: 0 -3rem 1rem -3rem;

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

    .box {
      box-shadow: 0 0 0.1rem lighten($--primary-color, 40%);
      transition: box-shadow 250ms;
      margin-bottom: 1rem;
      &:hover {
        box-shadow: 0 0 0.3rem $--primary-color;
      }
    }

    .modal-picture {
      max-width: 950px;
      min-width: 150px;
      min-height: 100px;
      cursor: zoom-out;
    }

    .comments {
      text-align: left;

      .gitment {
        padding: 0 .5rem;
        font-family: $--basic-font-family;
      }
    }
  }
</style>
<script lang="ts" src="./detailable-page.component.ts"></script>
