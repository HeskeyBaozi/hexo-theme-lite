<template>
  <div id="app-layout">
    <top-nav :background="theme.background" :menu="theme.menu" :icons="theme.menu_icons"></top-nav>
    <header class="app-header container">
      <top-header :avatar="theme.avatar" :background="theme.background" :site="site"></top-header>
    </header>

    <section class="app-body container">
      <router-view></router-view>
    </section>

    <footer class="app-footer container">
      <bottom-footer :powered="theme.powered_by" :social="theme.social" :icons="theme.social_icons" :site="site" :background="theme.background"></bottom-footer>
    </footer>

  </div>
</template>

<style lang="less" src="@/styles/helpers.less"></style>
<style lang="less" scoped>
.app-header {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-top: 8rem;
}

.app-footer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 1rem;
}

.app-body {
  box-sizing: border-box;
  background-color: white;
  padding: 1rem;
}
</style>

<script lang="ts" src="./app-layout.component.ts"></script>

