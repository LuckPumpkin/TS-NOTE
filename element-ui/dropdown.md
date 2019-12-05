# dropDown

>页面滚动 下拉列表与输入框分离

- 添加属性 :popper-append-to-body="false" 将弹出框插入body元素，解决弹出框定位问题
- 但若表格中有嵌套下拉框 此方法无效并造成下拉框无法显示问题

```html
<el-form-item :label="$t('tableLabel.sampleProcessing.businessType')" prop="busType">
  <el-select v-model="value" placeholder="请选择" :popper-append-to-body="false">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</el-form-item>
```
