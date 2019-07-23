<!-- 基础列表页 -->
<template>
  <div>
    <Search :query="list_form" @submit="listHandle" @create="createHandle"></Search>
    <List v-loading="loading"
          :list="res_list" :page="page" :params="params"
          @submit="listHandle" @delte="deleteHandle" @update="updateHandle" ></List>
    <!--<Dialog :show="show" :query="dialog_form" @submit="submitHandle"></Dialog>-->
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import List from '@/components/List.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  components: {
    List, Search
  },
  data() {
    return {
      route: '',
      create: {},
      del: {},
      update: {},
      find: {},
      list: {},

      list_form: {},
      params: {},
      page: {},
      res_list: [],
      dialog_form: {},
      loading: false,
      show: false,
    }
  },


  methods: {
    init() {
      let paths = this.$store.state.base && this.$store.state.base.paths;
      this.route = this.$route.path.replace('-resource','').replace(/-/g,'_');
      this.create = paths[`${this.route}/create`].post.parameters;
      this.del = paths[`${this.route}/delete`].post.parameters;
      this.update = paths[`${this.route}/update`].post.parameters;
      this.find = paths[`${this.route}/find`].get.parameters;
      this.list = paths[`${this.route}/list`].get.parameters;

      this.list_form = this.list;
    },
    listHandle(params){
      console.log(params);
      this.loading = true;
      this.params = params;
      this.$ajax.get(`${this.route}/list`, { params } ).then((res) => {
        this.res_list = res.data;
        this.page = {
          no: params.currentPage+1,
          num: params.countPerPage,
          total: res.total_count
        };
      }).catch((e) => { console.log(e); }).finally(() => { this.loading = false;})
    },
    createHandle(){},
    updateHandle(){},
    deleteHandle(){},
    submitHandle(){},

  },
  created() {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.init();
  }
}
</script>
