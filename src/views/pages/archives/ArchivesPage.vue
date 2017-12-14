<template>
  <div class="archives-page">
    <div class="timeline" v-for="key of timeLines.keys" :key="key">
        <div class="leading">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <span>{{ key }}</span>
        </div>
        <el-row type="flex" class="one-timeline" v-for="one of timeLines.entities[key]" :key="'title-' + one.slug">
            <el-col class="one-time" :span="4" :offset="2">{{ one.date | format(format) }}</el-col>
            <el-col class="one-title" :span="18">
              <a v-if="one.link && one.link.length" :href="one.link" target="_blank">
                <span>{{ one.title || 'Untitled' }}</span>
                <i class="fa fa-link external-link" aria-hidden="true"></i>
              </a>
              <router-link v-else :to="{ name: 'post-page', params: { slug: one.slug } }">
                <span>{{ one.title || 'Untitled' }}</span>
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

<style lang="less" scoped>
.archives-page {
  a {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    transition: all 200ms;
    &:hover {
      border-bottom-color: #5c5c5c;
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
      margin-top: 0;
      > * {
        margin: 0 0.2rem;
      }
    }

    .one-timeline {
      .one-time {
        text-align: center;
      }

      .one-title {
        word-break: keep-all;
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

<style lang="less">
.el-pagination .el-pager .active {
  background-color: #5c5c5c;
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

