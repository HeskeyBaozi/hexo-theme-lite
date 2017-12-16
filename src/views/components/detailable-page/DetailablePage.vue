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
      <span class="create-time">{{ target.date | format(format) }}</span>
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

    <!-- content -->
    <detailable-content :html="target.content"></detailable-content>

    <!--back to top-->
    <end-of-file></end-of-file>
  </div>
</template>

<style lang="less" scoped>
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

  }
</style>
<script lang="ts" src="./detailable-page.component.ts"></script>
