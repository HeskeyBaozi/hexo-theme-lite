<template>
  <div id="app">
    <top-nav :menu="theme.menu" :icons="theme.menu_icons" :blur="gaussian_radius.top_navigator"></top-nav>
    <header class="app-header container">
      <top-header :avatar="theme.avatar" :site="site" :blur="gaussian_radius.header"></top-header>
    </header>

    <section class="app-body container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>

    <footer class="app-footer">
      <bottom-footer :powered="theme.powered_by" :social="theme.social" :icons="theme.social_icons"
                     :site="site" :blur="gaussian_radius.footer"></bottom-footer>
    </footer>

  </div>
</template>

<style lang="less" src="@/styles/helpers.less"></style>
<style lang="less" scoped>
  #app {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
  }

  .app-header {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 10rem;
  }

  .app-footer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 10rem;
    flex-grow: 1;
  }

  .app-body {
    box-sizing: border-box;
    background-color: white;
    padding: 2rem 1rem;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
</style>

<style lang="less">

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-leave-active,
  .fade-enter {
    opacity: 0;
  }

</style>


<script lang="ts" src="./app-layout.component.ts"></script>

