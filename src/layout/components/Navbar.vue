<template>
  <div class="navbar">
    <div class="navbar_left">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" @command="handleCommand">
        <div class="avatar-wrapper">
          <el-avatar :src="userInfo.photo" size="small" @error="errorHandler">
            {{ userInfo.name && userInfo.name.substring(0,1) }}
          </el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { logout } from '@/pages/index/http'
import { removeAuthority } from '@/utils'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      'userInfo': state => state.userInfo
    }),
    ...mapGetters([
      'sidebar',
      'device'
    ]),
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'updateUserInfo',
    ]),
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      logout().then(() => {
        removeAuthority();
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      });
    },
    errorHandler() {
      return true
    },
    handleCommand(command) {
      this[command]();
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;
    vertical-align: text-bottom;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      &.hover-effect {
        cursor: pointer;
        transition: background-color .3s;

        &:hover {
          background-color: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
