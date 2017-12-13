<template>
  <div class="categories-page">
    <el-tabs :tab-position="tabPosition" v-model="currentTab">
      <el-tab-pane name="categories" label="Categories">
        <div class="mb">
          <el-input v-model="searchValue" class="search" placeholder="Search categories by name...">
            <div class="suffix" slot="suffix">
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </el-input>
          <el-tree :data="categoriesTree" :props="treeProps" node-key="slug" empty-text="No data :)" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :render-content="renderContent" :filter-node-method="filter" ref="tree"></el-tree>
        </div>
      </el-tab-pane>
      <el-tab-pane name="related-posts" label="Related Posts" :disabled="relatedDisabled">
        <div class="mb">
          <h2 class="leading"><i class="fa fa-bookmark-o" aria-hidden="true"></i><span>{{ $route.query.slug }}</span></h2>
          <el-input v-model="searchPostValue" class="search" placeholder="Search posts by title...">
            <div class="suffix" slot="suffix">
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </el-input>
          <article-card v-for="post of displayPosts" :key="post.slug" :format="format" :post="post" :showPhotos="false"></article-card>
          <p v-if="searchPostValue.length && displayPosts.length"><i class="fa fa-check" aria-hidden="true"></i> {{ displayPosts.length }} Post{{ displayPosts.length >= 2 ? 's' : ''}} in total.</p>
        </div>
      </el-tab-pane>
    </el-tabs>
    <resize-sensor :initial="true" @resize="resize"></resize-sensor>
  </div>
</template>

<style lang="less" scoped>
.categories-page {
  margin-bottom: 2rem;

  .suffix {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .mb {
    > * {
      margin-top: 0;
      margin-bottom: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .leading {
    text-align: center;
    font-weight: normal;
    text-shadow: 1px 1px 10px white;
    > * {
      margin: 0 0.5rem;
    }
  }
}
</style>


<script lang="ts" src="./categories.page.ts"></script>

