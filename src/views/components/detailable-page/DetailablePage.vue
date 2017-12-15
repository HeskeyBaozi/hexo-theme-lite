<template>
  <div class="detailable-page">
    <!-- title -->
    <h1 class="title">
      <a v-if="!isImplicit && target.link && target.link.length" :href="target.link" target="_blank">
        <span>{{ target.title || 'Untitled' }}</span>
        <i class="fa fa-link external-link" aria-hidden="true"/>
      </a>
      <span v-else>{{ target.title || 'Untitled' }}</span>
    </h1>

    <!-- meta -->
    <p v-show="!isImplicit" class="meta">
      <span class="create-time">{{ target.date | format(format) }}</span>
    </p>

    <!-- content -->
    <article id="detailable-content" v-html="target.content"></article>
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
  }
</style>
<style lang="less" src="./figure-code-style.less"></style>
<style lang="less" src="./base-article-style.less"></style>


<script lang="ts" src="./detailable-page.component.ts"></script>
