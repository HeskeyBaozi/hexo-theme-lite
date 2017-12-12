<template>
  <div id="archives-page">
    <h1 class="title">Archives</h1>
    <div class="timeline" v-for="key of timeLines.keys" :key="key">
      <p class="leading">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
        <span>{{ key }}</span>
      </p>
      <div class="list">
        <el-row type="flex" class="one-timeline" v-for="one of timeLines.entities[key]" :key="one.slug">
          <el-col class="one-time" :span="4" :offset="2">{{ one.date | format(format) }}</el-col>
          <el-col class="one-title" :span="17">
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
    </div>
    <el-pagination class="pagination" v-if="shouldPage" small layout="prev, pager, next"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              :current-page="page" @current-change="onPage"></el-pagination>
  </div>
</template>

<style lang="less" scoped>
.title {
  text-align: center;
  margin: 0 0 1rem 0;
}

.timeline {
  margin-top: 0;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}

.leading {
  margin-top: 0;
  > * {
    margin: 0 0.2rem;
  }
}

.list {
  a {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    transition: all 200ms;
    &:hover {
      border-bottom-color: #5c5c5c;
    }
  }
}

.one-timeline {
  margin-bottom: 1rem;
}

.one-time {
  text-align: center;
}

.one-title {
  word-break: keep-all;
}

.external-link {
  font-size: 0.8em;
}

.pagination {
  text-align: center;
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
</style>

<script lang="ts" src="./archives.page.ts"></script>

