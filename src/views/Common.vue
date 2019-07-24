<!-- 基础列表页 -->
<template>
  <div>
    <section v-if="load" v-loading="load" class="load" text="页面加载中"></section>
    <section v-else>
      <Search :props="props_query" @submit="listHandle"></Search>
      <div style="padding:10px 0;">
        <el-button type="primary" @click="createHandle()" size="mini">新增</el-button>
        <el-button type="danger" @click="deleteHandle()" size="mini">批量删除</el-button>
      </div>
      <List v-loading="loading"
            :props="props_list"
            :list="res_list" :page="page" :form="list_form"
            @submit="listHandle" @delete="deleteHandle"
            @update="updateHandle" ref="commonList"></List>
    </section>

    <Dialog ref="commonEdit" :show="dialog_show"
            :props="props_edit" :type="dialog_type"
            @submit="submitHandle" ></Dialog>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import List from '@/components/List.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  components: {
    List, Search, Dialog
  },
  data() {
    return {
      load: false,
      route: '',
      props_query: '',
      props_list: '',
      props_edit: '',

      list_form: {},
      page: {},
      loading: false,
      res_list: [],
      dialog_show: false,
      dialog_type: '',
    }
  },


  methods: {
    init() {
      let paths = this.$store.state.paths;
      this.route = this.$route.path;

      if(this.$store[this.route]) {
        this.props_query = this.$store[this.route].query;
        this.props_list = this.$store[this.route].list;
        this.props_edit = this.$store[this.route].edit;
        this.load = false;
        this.listHandle(this.list_form);
      } else {
        this.$ajax.get(`${this.$Base}/props?type=${this.route}`).then((res) => {
          this.$store[this.route] = res.data;
          this.props_query = res.data.query;
          this.props_list = res.data.list;
          this.props_edit = res.data.edit;
          this.load = false;
          this.listHandle(this.list_form);
        }).catch((e)=> {})
      }
    },


    listHandle(params){
      this.loading = true;

//      let ax = this.$store.state.paths[this.route+'/list'];
//      let me = Object.keys[ax][0];
//      let parameters = ax[me].parameters;
      this.list_form = params;

      this.$ajax.get(`${this.route}/list`, { params } ).then((res) => {
        this.res_list = res.data.filter((item) => { return !item.isDelete;});
        this.page = {
          no:  params && params.currentPage? +params.currentPage+1 : 1,
          num: params && params.countPerPage? +params.countPerPage : 20,
          total: res.total_count
        };
      }).catch((e) => { console.log(e); }).finally(() => { this.loading = false;})
    },

    /**
     * 删除
     * @param data 单个ID
     */
    deleteHandle(data){
      let id = data ? data : this.$refs.commonList.multipleSelection;
      this.loading = true;
      this.$ajax.post(`${this.route}/delete?id=${id}` ).then((res) => {
        this.$message.success('操作成功');
        this.listHandle(this.list_form);
      }).catch(() => {}).finally(() => { this.loading = false;})
    },


    createHandle(){
      this.dialog_type = 'create';
      this.dialog_show = true;
    },
    updateHandle(id){
      this.dialog_type = 'edit';
      this.$ajax.get(`${this.route}/find?id=${id}` ).then((res) => {
        this.$refs.commonEdit.form = res.data;
        this.dialog_show = true;
      }).catch((e) => { console.log(e); }).finally(() => { this.loading = false;})

    },
    submitHandle(params){
      console.log(this.dialog_type);
      if(this.dialog_type == 'create') {
        this.$ajax.post(`${this.route}/create`, { params } ).then((res) => {
          this.listHandle(this.list_form);
          this.dialog_show = false;
        }).catch((e) => { console.log(e); }).finally(() => { this.loading = false;})
      } else {
        this.$ajax.get(`${this.route}/update?id=${id}` ).then((res) => {
          this.$refs.commonEdit.form = res.data;
          this.dialog_show = true;
        }).catch((e) => { console.log(e); }).finally(() => { this.loading = false;})
      }
    },


  },
  mounted() {
    this.load = true;
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.load = true;
    this.init();

  }
}
</script>
