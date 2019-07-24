<template>
  <div>
    <el-dialog
            :visible.sync="$parent.dialog_show"
            :title="type"
            width="60%">
      <div>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item v-for="(item,i) in props" :label="item.des" :key="i">
            <el-select
                    v-if="item.type == 'select'"
                    v-model="form[item.name]"
                    style="width:200px"
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
                    style="width:200px"
                    clearable/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  props: ['props','type'],
  computed: {
    showDialog(){ return this.show;}
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
    }
  }
}
</script>