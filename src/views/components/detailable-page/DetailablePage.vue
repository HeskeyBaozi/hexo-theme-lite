<template>
  <div class="full-article">
    <!-- title -->
    <h1 class="title">
      <a v-if="!isImplicit && target.link && target.link.length" :href="target.link" target="_blank">
        <span>{{ target.title || 'Untitled' }}</span>
        <i class="fa fa-link external-link" aria-hidden="true"/>
      </a>
      <span v-else>{{ target.title || 'Untitled' }}</span>
    </h1>

    <!-- meta -->
    <p v-if="!isImplicit" class="meta">
      <span class="create-time">{{ target.date | format(format) }}</span>
    </p>
  </div>
</template>

<style lang="less" scoped>
.full-article {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  text-align: center;

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
}
</style>

<script lang="ts" src="./detailable-page.component.ts"></script>
