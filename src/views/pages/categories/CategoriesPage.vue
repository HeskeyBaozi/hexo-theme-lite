<template>
  <div class="categories-page">
    <el-input v-model="search" class="search" placeholder="Search categories by name...">
      <div class="suffix" slot="suffix">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    </el-input>
    <el-tree ref="tree" :data="categoriesTree" :props="treeProps" node-key="slug" empty-text="No data :)" default-expand-all :expand-on-click-node="false" :render-content="renderContent" :filter-node-method="filter" @node-click="nodeClick" ></el-tree>
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

  > * {
    margin-top: 0;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>


<script lang="ts" src="./categories.page.ts"></script>

