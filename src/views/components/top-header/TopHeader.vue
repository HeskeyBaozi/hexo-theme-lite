<template>
  <blur-div :background="background" id="lite-header" :blur="30">
      <img v-if="avatar.enable" class="avatar" :src="avatar.url" alt="avatar"/>
      <p class="author">{{ site.author }}</p>
      <p class="description">{{ site.description }}</p>
  </blur-div>
</template>

<style lang="less" scoped>
#lite-header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: white;
  text-shadow: 1px 1px 8px #444;
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

