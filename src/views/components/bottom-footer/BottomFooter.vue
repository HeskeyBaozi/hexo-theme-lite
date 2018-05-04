<template>
  <blur-div id="lite-footer" :blur="blur">
    <div class="icon-list">
      <a :href="item.url" :key="item.name" target="_blank" v-for="item of socialItems">
          <span v-if="icons.enable">
            <i :class="`fa ${item.icon}`" aria-hidden="true"></i>
          </span>
        <span v-else>
            {{item.name}}
          </span>
      </a>
    </div>
    <p v-if="powered.text" class="powered-by">
      <a v-if="powered.url" :href="powered.url" target="_blank">{{ powered.text }}</a>
      <span v-else>{{ powered.text }}</span>
    </p>
    <router-link class="title" :to="{ path: '/' }">{{ site.title }}</router-link>
    <p class="subtitle">{{ site.subtitle }}</p>
  </blur-div>
</template>

<style lang="scss" scoped>
  @import '../../../styles/vars.scss';

  #lite-footer {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    text-shadow: 0 0 .5rem mix($--black, $--primary-color, 50%);
    padding: 1rem 0 .5rem 0;

    > * {
      margin-top: 0;
      margin-bottom: .5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      color: inherit;
      transition: transform 100ms;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .icon-list {
    display: flex;
    > a {
      margin: 0 0.5rem;
    }
  }

  .powered-by {
    font-size: 0.8em;
  }

  .title {
    font-size: 1.3em;
  }
</style>

<script lang="ts" src="./bottom-footer.component.ts"></script>
