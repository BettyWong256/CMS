<template>
  <div>
    <el-card shadow="none">
      <el-form
              :inline="true"
              :model="form"
              class="demo-form-inline"
              size="small"
              label-position="right"
              label-width="60px">
        <el-form-item v-for="(item,i) in props" :label="item.des" :key="i">
          <el-select
                  v-if="item.type == 'select'"
                  v-model="form[item.name]"
                  placeholder="请选择">
            <el-option v-for="(val,key) in item.enum" :label="val" :value="key" :key="key"/>
          </el-select>

          <el-switch
                  v-if="item.type == 'boolean'"
                  v-model="form[item.name]"
                  active-color="#13ce66">
          </el-switch>

          <el-input
                  v-if="item.type == 'input'"
                  v-model="form[item.name]"
                  clearable
          />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          <el-button type="default" @click="resetForm" size="mini">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {}
      }
    },
    props: ['props'],
    methods: {
      onSubmit() {
        this.$emit('submit', this.form);
      },
      resetForm() {
        this.form = {};
      },
      add() {
        this.$emit('create');
      }
    }
  }
</script>