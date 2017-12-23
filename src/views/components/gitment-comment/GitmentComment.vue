<template>
  <div id="lite-gitment-root"></div>
</template>

<style src="gitment/style/default.css"></style>
<style lang="scss">
  @import '../../../styles/vars.scss';

  #lite-gitment-root {
    .gitment-container {
      font-family: $--basic-font-family !important;
      a {
        color: $--primary-color;
        text-decoration: underline;
      }
      .gitment-comments-init-btn,
      .gitment-editor-submit {
        background-color: $--primary-color;
        font-family: $--basic-font-family !important;
        font-size: 1rem;
        font-weight: normal;
        transition: all 200ms;
        border-radius: .2rem;

        &:hover {
          background-color: lighten($--primary-color, 15%);
        }
      }

    }
  }
</style>

<script lang="ts" src="./gitment-comment.component.ts"></script>
