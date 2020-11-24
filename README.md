# A practise for creating components by typescript, I mean, as theShy in LoL
 
 用typescript尝试写组件库


# 组件目录结构[参考antd]
```
|-- button                                 |-- 按钮组件目录
   |   |-- button.tsx                         |   |-- 按钮组件主要实现代码
   |   |-- index.md                           |   |-- 组件说明文档
   |   |-- index.tsx                          |   |-- 暴露组件以及相关属性等
   |   |-- demo                               |   |-- 组件demo说明文档目录
   |   |   |-- basic.md                       |   |   |-- 按组件各个功能划分写demo文档
   |   |-- __tests__                          |   |-- 组件单元测试目录
   |   |   |-- index.test.tsx                 |   |   |-- 组件单元测试文件
   |   |-- style                              |   |-- 组件样式目录
   |       |-- index.less                     |       |-- 主要样式定义
   |       |-- index.tsx                      |       |-- 暴露样式文件
   |       |-- mixin.less                     |       |-- 所有组件定义less的mixin统一在mixin.less文件
```

# 工程命令
```
    npm run new                           - 按模板生成一个新的组件

```



# 项目架构
```
|- build               - 构建相关
    
|- components          - 组件集合

|- static              - 静态资源集合, 如icon等

|- tools               - 效能功能

|- config              - 系统级别的配置定义

|- style               - 样式
    |- theme           - 主题
    |- 
```