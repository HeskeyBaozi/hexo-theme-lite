<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style src="normalize.css"></style>
<style src="@/styles/theme/index.css"></style>
<style src="@/styles/nprogress.css"></style>
<style src="font-awesome/css/font-awesome.min.css"></style>
<style src="@/assets/fonts/proximanova.css"></style>

<style lang="less">
html {
  font-family: "Proxima Nova Rg", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

body {
  overflow-y: scroll;
}

a {
  color: #5c5c5c;
  text-decoration: none;
  transition: all 200ms;

  &:hover {
    color: darken(#5c5c5c, 20%);
  }
}
</style>

