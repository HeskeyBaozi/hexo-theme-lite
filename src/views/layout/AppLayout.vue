<template>
  <div id="app-layout">
    <top-nav :config="theme.background" :menu="theme.menu" :icons="theme.menu_icons"></top-nav>
    <header>

    </header>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  #app-layout {
    height: 100vh;
    width: 100%;
  }

</style>

<script lang="ts" src="./app-layout.component.ts"></script>

