<template>
  <div>
    <el-table
            :data="list"
            style="width: 100%">
      <el-table-column v-for='(val,key) in list[0]' :label="key">
        <template slot-scope="scoped">
          {{val}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <div class="btn-group">
            <el-button type="primary" size="mini" @click="edit(scoped.row.id)">修改</el-button>
            <el-button type="delete" size="mini" @click="del(scoped.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            @size-change="submit(1,$event)"
            @current-change="submit($event-1, page.num)"
            :current-page="+page.no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="+page.num"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: ['page','list','params'],
    methods: {
      edit(id) {
        this.$emit('update',id);
      },
      del(id) {
        this.$emit('delete',id);
      },
      submit(no,num) {
        this.params.currentPage = no;
        this.params.countPerPage = num;
        this.$emit('submit', this.params);
      }
    }
  }
</script>