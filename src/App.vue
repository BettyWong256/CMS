<template>
  <div id="app" v-loading="loading">
    <el-header style="background:#409EFF;height:60px;line-height:60px;color:#fff;">管理后台</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
                router
                class="el-menu-vertical-demo"
                :default-active="$route.path"
                style="height: calc(100vh - 60px);overflow-y:auto;"
        >
          <el-menu-item index="/">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item v-for='(val,key) in $store.state.config' :index="'/'+key">
            <span slot="title">{{val}}</span>
          </el-menu-item>
          <!-- 自定义-->
          <!--<el-menu-item index="/about">-->
            <!--<span slot="title">About</span>-->
          <!--</el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main style="height: calc(100vh - 60px);overflow-y:auto;">
        <router-view/>
      </el-main>
    </el-container>
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
          this.$store.state.paths = data.paths;
          this.loading = false;
        }).catch((error) => {
          console.log(error);
        });
        this.$ajax.get(`${this.$Base}/config`).then((res)=>{
          this.$store.state.config = res.data;
        }).catch((e) => {})
      }
    },
  };
</script>