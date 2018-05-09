# webpack4.0 项目配置

**vue-loader 版本 v15以上**

## 说明

1. 总入口配置 entrys.config.js


2. 目录结构

pages 文件结构,每个单页的入口文件 main.js，目录名称与 entrys.config.js 的 page 对应

```
├── index
│   ├── app.vue
│   ├── components
│   │   └── demo.vue
│   └── main.js
└── user
    ├── components
    │   └── user.vue
    └── main.js
```
