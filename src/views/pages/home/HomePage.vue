<template>
  <div id="home-page">
    <el-button class="back" v-show="page !== 1" plain size="mini" @click="onPage(1)">
      <i class="fa fa-undo" aria-hidden="true"></i>
      <span>Back</span>
    </el-button>
    <div class="article-card-list">
      <article-card v-for="post of posts"
                    :key="post.slug"
                    :format="format"
                    :post="post"
                    :showPhotos="true"
                    @photo-zoom-in="showPhotoDetail"></article-card>
    </div>
    <el-pagination class="pagination" v-if="shouldPage" small layout="prev, pager, next"
                   :total="pagination.total"
                   :page-size="pagination.pageSize"
                   :current-page="page" @current-change="onPage"></el-pagination>
    <el-dialog :visible.sync="modal.isShown" width="min-content">
      <img class="modal-picture" :src="modal.url" :alt="modal.url" @click="modal.isShown = false"/>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  #home-page {
    .back {
      margin-bottom: 1rem;
    }

    .modal-picture {
      max-width: 950px;
      min-width: 150px;
      min-height: 100px;
      cursor: zoom-out;
    }

    .pagination {
      text-align: center;
    }
  }
</style>

<style lang="scss">
  @import '../../../styles/vars.scss';

  .el-pagination .el-pager .active {
    background-color: $--primary-color;
    color: white;
    border-radius: 0.2rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
</style>


<script lang="ts" src="./home.page.ts"></script>

