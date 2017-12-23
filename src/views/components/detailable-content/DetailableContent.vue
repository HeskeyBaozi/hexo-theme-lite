<template>
  <article id="detailable-content" v-html="html"></article>
</template>

<style lang="scss">
  @import '../../../styles/vars.scss';

  #detailable-content {
    padding: 0 1rem;

    @media (max-width: $--small-screen-width) {
      padding: 0;
    }
  }
</style>

<style lang="scss" src="./figure-code-style.scss"></style>
<style lang="scss" src="./base-article-style.scss"></style>

<script lang="ts" src="./detailable-content.component.ts"></script>
