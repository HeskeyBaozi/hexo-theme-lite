<template>
  <blur-div :background="background" id="lite-footer" :blur="80">
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
    <p v-if="powered.length" class="powered-by">{{ powered }}</p>
    <router-link class="title" :to="{ path: '/home' }">{{ site.title }}</router-link>
    <p class="subtitle">{{ site.subtitle }}</p>
  </blur-div>
</template>

<style lang="less" scoped>
#lite-footer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: white;
  text-shadow: 1px 1px 8px #444;
  padding: 1rem 0 .5rem 0;

  > * {
    margin-top: 0;
    margin-bottom: .5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: white;
    text-shadow: 1px 1px 8px #444;
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
