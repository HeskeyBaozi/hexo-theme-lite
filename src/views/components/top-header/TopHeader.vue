<template>
  <blur-div id="lite-header" :blur="blur">
    <img v-if="avatar.enable" class="avatar" :src="avatar.url" alt="avatar"/>
    <p class="author">{{ site.author }}</p>
    <p class="description">{{ site.description }}</p>
  </blur-div>
</template>

<style lang="scss" scoped>
  @import '../../../styles/vars.scss';

  #lite-header {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    text-shadow: 0 0 .5rem mix($--black, $--primary-color, 50%);
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    padding: 1rem;
  }

  .avatar {
    display: inline-block;
    width: 4.3rem;
    height: 4.3rem;
    border-radius: 50%;
    box-shadow: 1px 1px 3px white;
  }

  .author {
    font-size: 1.2em;
    margin-bottom: .3rem;
  }

  .description {
    font-size: 0.9em;
    margin-bottom: .3rem;
  }
</style>

<script lang="ts" src="./top-header.component.ts"></script>

