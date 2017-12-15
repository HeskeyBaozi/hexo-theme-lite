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
    <article id="detailable-content" v-html="target.content"></article>

    <!--back to top-->
    <el-button class="eof" type="text" size="mini" @click="scrollTop">
      <i class="fa fa-level-up" aria-hidden="true"></i>
      <span>EOF</span>
    </el-button>
  </div>
</template>

<style lang="less" scoped>
  .detailable-page {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    text-align: center;

    > * {
      margin: 0 0 1rem 0;
      width: 100%;
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

    .content {
      text-align: left;
    }

    .categories-and-tags {
      a {
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        transition: all 200ms;
        &:hover {
          border-bottom-color: #5c5c5c;
        }
      }
    }

    .eof {
      width: min-content;
    }
  }
</style>
<style lang="less" src="./figure-code-style.less"></style>
<style lang="less" src="./base-article-style.less"></style>
<script lang="ts" src="./detailable-page.component.ts"></script>
