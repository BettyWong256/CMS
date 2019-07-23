<template>
  <div id="app" v-loading="loading">
    <el-header>
      <el-menu
              router
              :default-active="$route.meta.root || $route.path"
              class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item v-for='(val,key) in $store.state.base.tags' :index="'/'+val.name">
          <span slot="title">{{val.description}}</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <span slot="title">About</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </div>
</template>

<script>
export default {
    data() {
      return {
        loading: true
      };
    },
    created() {
      this.getDefault();
    },
    methods: {
      getDefault() {
        this.$ajax.get('/v2/api-docs').then((data) => {
          this.$store.state.base = data;
          this.loading = false;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
  };
</script>