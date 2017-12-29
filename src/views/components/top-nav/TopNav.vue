<template>
  <div id="top-nav">
    <blur-div :blur="blur" isTopNav class="blur top-left-padding">
      <el-row class="main-menu" type="flex">
        <!--<= 768px-->
        <el-col :xs="24" :sm="0">
          <el-dropdown trigger="click" @command="routeTo">
            <el-button type="text">
              <div class="menu-btn">
                <span><i class="fa fa-bars" aria-hidden="true"></i></span>
                <span>Menu</span>
              </div>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item of navItems" :key="item.name" :command="item.path">
                <div class="dropdown-item">
                  <span class="icon"><i :class="`fa ${item.icon}`" aria-hidden="true"></i></span>
                  <span class="item-name">{{ item.name }}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <!-- > 768px-->
        <el-col :xs="0" :sm="24">
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="routeTo">
            <el-menu-item v-for="item of navItems" :key="item.name" :index="item.path">
              <span class="item-icon"><i :class="`fa ${item.icon}`" aria-hidden="true"></i></span>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </blur-div>
  </div>
</template>


<style lang="scss" scoped>
  @import '../../../styles/vars.scss';

  #top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 1000;
    overflow: hidden;
    color: white;
    text-shadow: 1px 1px 8px #444;
    .main-menu {
      width: 100%;
    }

  }

  .dropdown-item {
    display: flex;
    align-items: center;

    .icon {
      width: 1rem;
      text-align: center;
      margin-right: 0.3rem;
    }

    .item-name {
      flex-grow: 1;
    }
  }

  .blur {
    display: flex;
    align-items: center;
  }

  .menu-btn > span {
    margin-right: 0.2rem;

  }

  .item-icon {
    display: inline-block;
    width: 1rem;
    text-align: center;
  }

  .el-menu--horizontal {
    display: flex;
    justify-content: center;

    .el-menu-item {
      line-height: 40px;
      height: 40px;
      text-shadow: 0 0 2px white;
      color: mix($--white, $--primary-color, 35%);

      i {
        color: inherit;
      }

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0);
      }

      * {
        vertical-align: unset;
      }
    }

    .is-active {
      color: $--primary-color;
    }
  }

  .el-menu {
    background-color: rgba(255, 255, 255, 0);
  }

</style>
<style lang="scss" src="../../../styles/helpers.scss"></style>
<script src="./top-nav.component.ts" lang="ts"></script>
