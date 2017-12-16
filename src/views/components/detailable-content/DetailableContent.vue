<template>
  <article id="detailable-content" v-html="html"></article>
</template>

<style lang="less">
  @import url('~@/styles/vars.less');

  #detailable-content {
    padding: 0 1rem;

    @media (max-width: @small-max-width) {
      padding: 0;
    }
  }
</style>

<style lang="less" src="./figure-code-style.less"></style>
<style lang="less" src="./base-article-style.less"></style>

<script lang="ts" src="./detailable-content.component.ts"></script>
