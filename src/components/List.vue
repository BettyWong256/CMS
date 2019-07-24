<template>
  <div>
    <el-table
            :data="list"
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange"
    >
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column v-for='(item,i) in props' :label="item.des" :prop="item.name" :key="i" align="center"/>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <div class="btn-group">
            <router-link :to="`/detail${$route.path}?id=${scope.row.id}`" class="detail">查看</router-link>
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
            <el-button type="delete" size="mini" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px;text-align:right">
      <el-pagination
              @size-change="submit(1,$event)"
              @current-change="submit($event, page.num)"
              :current-page="+page.no"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="+page.num"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        multipleSelection: {}
      }
    },
    props: ['props','list','page','form','text'],
    methods: {
      edit(id) {
        this.$emit('update',id);
      },
      del(id) {
        this.$emit('delete',id);
      },
      submit(no,num) {
        this.form.currentPage = no - 1;
        this.form.countPerPage = num;
        this.$emit('submit', this.form);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map((item) => { return item.id}).join(',');
      }
    }
  }
</script>