<template>
  <div>
    <div>
      <h2>按钮</h2>
      <el-button type="success" round @click="handlePop">预约按钮</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <popComponent :tagglePop="tagglePop" @cancel="handleCancel" />
  </div>
</template>

<script>
import popComponent from './popComponent.vue'
export default {
  components: {
    popComponent
  },
  data() {
    return {
      tagglePop: false,
      tableData: [
        {
          name: '网三',
          age: 18,
          address: '赵州桥'
        },
        {
          name: '赵四',
          age: 20,
          address: '西湖'
        }
      ]
    }
  },
  methods: {
    handlePop() {
      this.tagglePop = true
    },
    handleCancel() {
      this.tagglePop = false
    }
  }
}
</script>

<style></style>
