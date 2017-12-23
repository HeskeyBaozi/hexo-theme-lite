<template>
  <div class="archives-page">
    <el-button v-show="page !== 1" plain size="mini" @click="onPage(1)">
      <i class="fa fa-undo" aria-hidden="true"></i>
      <span>Back</span>
    </el-button>
    <div class="timeline" v-for="key of timeLines.keys" :key="key">
      <div class="leading">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
        <span>{{ key | format('MMM. YYYY') }}</span>
      </div>
      <el-row type="flex" :gutter="10" class="one-timeline" v-for="one of timeLines.entities[key]"
              :key="'title-' + one.slug">
        <el-col class="one-time" :span="6" :offset="2">{{ one.date | format('Do. MMM') }}</el-col>
        <el-col class="one-title" :span="16">
          <a v-if="one.link && one.link.length" :href="one.link" target="_blank">
            {{ one.title || 'Untitled' }}
            <i class="fa fa-link external-link" aria-hidden="true"></i>
          </a>
          <router-link v-else :to="{ name: 'post-page', params: { slug: one.slug } }">
            {{ one.title || 'Untitled' }}
          </router-link>
        </el-col>
      </el-row>
    </div>
    <el-pagination class="pagination" v-if="shouldPage" small layout="prev, pager, next"
                   :total="pagination.total"
                   :page-size="pagination.pageSize"
                   :current-page="page" @current-change="onPage"></el-pagination>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../styles/vars.scss';

  .archives-page {
    a {
      border-bottom: 1px solid rgba(0, 0, 0, 0);
      transition: all 200ms;
      &:hover {
        border-bottom-color: $--primary-color;
      }
    }

    .timeline {
      .leading,
      .one-timeline {
        margin-top: 0;
        margin-bottom: 1.5rem;
      }

      .leading {
        text-align: center;
        font-size: 1.3rem;
        text-shadow: 0 0 1px lighten($--primary-color, 40%);
        margin-top: 0;
        > * {
          margin: 0 0.2rem;
        }
      }

      .one-timeline {
        .one-time {
          text-align: center;
          white-space: nowrap;
        }

        .one-title {
          word-break: break-all;

          .external-link {
            font-size: 0.8em;
          }
        }
      }
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

  .v-appear-active {
    transition: all 500ms;
  }

  .v-appear {
    opacity: 0;
    transform: translateX(-2em);
  }

  .v-move {
    transition: all 500ms;
  }
</style>

<script lang="ts" src="./archives.page.ts"></script>

