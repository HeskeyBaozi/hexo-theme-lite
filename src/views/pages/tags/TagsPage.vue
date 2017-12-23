<template>
  <div class="tags-page">
    <el-input v-model="search" class="search" placeholder="Search tags by name...">
      <div class="fix" slot="suffix">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
      <div class="fix" slot="prefix">
        <i class="fa fa-hashtag" aria-hidden="true"></i>
      </div>
    </el-input>
    <transition-group tag="div" name="tags" class="tags-list">
      <router-link class="one-tag" v-for="tag of displayTags" :key="tag.slug"
                   :to="{ name: 'related-posts-page', params: { type: 'tag', slug: tag.slug } }">
        <span :style="`fontSize: calc(100% + 0.${0.5 * tag.count * tag.count + 1}em)`">{{ tag.slug }}</span>
      </router-link>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
  .tags-page {
    margin-bottom: 2rem;

    .fix {
      height: 100%;
      width: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > * {
      margin-top: 0;
      margin-bottom: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .tags-list {
      padding: 0 3rem;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      > * {
        margin-right: 0.8rem;
        margin-bottom: 1rem;
        &:last-child {
          margin-right: 0;
        }
      }

      .one-tag {
        display: flex;
        align-items: center;
        transition: all 250ms;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
</style>


<script lang="ts" src="./tags.page.ts"></script>

