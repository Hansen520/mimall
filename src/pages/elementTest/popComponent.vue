<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="800px">
      <div style="text-align: center" class="transfer">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          :render-content="renderFunc"
          :titles="['Source', 'Target']"
          :button-texts="['到左边', '到右边  ']"
          @change="handleChange"
          :data="data"
        >
          <el-button class="transfer-footer" slot="left-footer" size="small"
            >操作</el-button
          >
          <el-button class="transfer-footer" slot="right-footer" size="small"
            >操作</el-button
          >
        </el-transfer>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleCancel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    tagglePop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const generateData = (_) => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      dialogVisible: false,
      data: generateData(),
      value: [1, 6],
      value4: [1, 2],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} -1 {option.label}
          </span>
        )
      }
    }
  },
  watch: {
    tagglePop(newVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel', false)
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style lang="scss">
.transfer .el-transfer__button:first-child {
  display: block;
}
.transfer .el-button + .el-button {
  margin: 0;
}
</style>
