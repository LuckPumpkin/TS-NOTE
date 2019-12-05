# table  

## 显示与隐藏bug

>问题：当有两列需要显示与隐藏时，多个v-if会产生表格错误现象

- 解决方法：添加 :key="Math.random()"
- 原因:是因为表格是element-ui通过循环产生的，而vue在dom重新渲染时有一个性能优化机制，相同dom会被复用;所以，通过key去标识一下当前行是唯一的，不许复用，就行了。

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column type="selection" width="55" :key="Math.random()" v-if="show"></el-table-column>
  <el-table-column prop="date" label="日期" :key="Math.random()"></el-table-column>
  <el-table-column prop="name" label="姓名" :key="Math.random()" ></el-table-column>
  <el-table-column prop="address" label="地址" :key="Math.random()" ></el-table-column>
  <el-table-column fixed="right" label="操作" width="100" :key="Math.random()" v-if="show">
    <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      <el-button type="text" size="small">编辑</el-button>
    </template>
  </el-table-column>
</el-table>
```

### 未完待续~
