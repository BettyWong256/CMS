<template>
  <div>
    <!--<el-card shadow="none">-->
      <el-form
              :inline="true"
              :model="form"
              class="demo-form-inline"
              size="small"
              label-position="right"
              label-width="100px">
        <el-form-item v-for="(v,k) in query" :label="v.name"">
          <el-select
                  v-if="v.enum"
                  v-model="form[v.name]"
                  placeholder="请选择">
            <el-option v-for="(item,i) in v.enum" :label="item" :value="item" :key="i"/>
          </el-select>
          <el-switch
                  v-else-if="v.type=='boolean'"
                  v-model="form[v.name]"
                  active-color="#13ce66">
          </el-switch>
          <el-input
                  v-else
                  v-model="form[v.name]"
                  clearable
          />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-delete" @click="resetForm" size="mini">清空</el-button>
        </el-form-item>
      </el-form>
    <!--</el-card>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {}
      }
    },
    props: ['query'],
    methods: {
      onSubmit() {
        console.log(this.form);
        this.$emit('submit', this.form);
      },
      resetForm() {
        this.form = {};
      },
    },
    mounted() {
      this.onSubmit();
    }
  }
</script>