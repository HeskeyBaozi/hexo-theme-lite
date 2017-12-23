<template>
  <div class="related-posts">
    <div class="control-panel">
      <el-input v-model="search" class="search" placeholder="Search posts by title...">
        <div class="btn-warp" slot="prepend">
          <el-button size="mini" @click="back">
            <div class="btn-warp">
              <i class="fa fa-undo" aria-hidden="true"></i>
              <span class="back">Back</span>
            </div>
          </el-button>
        </div>
        <div class="fix" slot="suffix">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </el-input>
    </div>
    <p class="search-result">
      <i :class="`fa ${search.length ? 'fa-check' : 'fa-smile-o' }`" aria-hidden="true"></i>
      <span>{{ displayPosts.length}} post{{ displayPosts.length >= 2 ? 's' : '' }} {{ search.length ? 'searched' : '' }} in total.</span>
    </p>
    <el-dialog :visible.sync="modal.isShown" width="min-content">
      <img class="modal-picture" :src="modal.url" :alt="modal.url" @click="modal.isShown = false"/>
    </el-dialog>
    <div class="article-list">
      <article-card v-for="post of displayPosts" :key="post.slug" :format="format" :post="post" :showPhotos="true"
                    @photo-zoom-in="showPhotoDetail"></article-card>
    </div>
    <!--back to top-->
    <end-of-file v-show="shouldShowEOF"></end-of-file>
  </div>
</template>

<style lang="scss" scoped>
  .related-posts {
    text-align: center;

    .control-panel {
      display: flex;
      justify-content: center;

      .btn-warp {
        display: flex;
        align-items: center;

        .back {
          margin-left: 0.2rem;
        }
      }

      > * {
        margin-right: 1rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .search-result {
      > * {
        margin: 0 0.2rem;
      }
    }

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

    .modal-picture {
      max-width: 950px;
      min-width: 150px;
      min-height: 100px;
      cursor: zoom-out;
    }
  }
</style>

<script lang="ts" src="./related-posts.component.ts"></script>
