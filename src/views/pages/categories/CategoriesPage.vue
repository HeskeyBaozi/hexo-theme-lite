<template>
  <div class="categories-page">
    <el-tabs :tab-position="tabPosition" :value="$route.query.name ? 'related-posts' : 'categories'" ref="tab">
      <el-tab-pane name="categories" label="Categories">
        <div class="mb tab">
          <el-input v-model="searchValue" class="search" placeholder="Search Categories...">
            <div class="suffix" slot="suffix">
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </el-input>
          <el-tree :data="categoriesTree" :props="treeProps" node-key="slug" empty-text="No data :)" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :render-content="renderContent" :filter-node-method="filter" ref="tree"></el-tree>
        </div>
      </el-tab-pane>
      <el-tab-pane name="related-posts" label="Related Posts">

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

  .tab {
  }
}
</style>


<script lang="ts" src="./categories.page.ts"></script>

