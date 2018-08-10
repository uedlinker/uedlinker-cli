# console-template

基于 React 技术栈和 Ant Design Pro 组件库的后台管理开发模板。

## 技术栈

- 框架：[React]
- UI 库：[Ant Design]、[Ant Design Pro]
- 路由：[React Router]
- 状态管理：[Rematch]
- 请求库：[Axios]
- 构建工具：[Uedlinker Scripts]

## 开发

```shell
# 克隆仓库
git clone git@github.com:uedlinker/uedlinker-cli.git

# 切换目录
cd uedlinker-cli

# 切换到此功能的开发分支
git checkout -b feature/console-template origin/feature/console-template
git checkout --track origin/feature/console-template

# 切换到模板目录并安装模板依赖
cd templates/console && npm i

# 启动开发环境
npm run dev
```

更多命令请查看 [package.json](https://github.com/uedlinker/uedlinker-cli/blob/feature%2Fconsole-template/templates/console/package.json) 文件中的 scripts 字段。

当要提交代码时：

```shell
# 从模板开发目录切换到项目根目录
cd ../../

# 安装依赖
npm i

# 后面就是你自己的事情了
```

**注意：一定要先安装模板依赖，后安装项目依赖，因为两者都安装了 husky 这个包，会引起冲突。**

提交规范中的 Scope 取值请查看项目根目录下 [.commitlintrc.json](https://github.com/uedlinker/uedlinker-cli/blob/feature%2Fconsole-template/.commitlintrc.json) 文件。

## TODO

- [x] 结合 Uedlinker Scripts 创建开发环境；
- [ ] 基于 Ant Design Pro 提供基本网页框架（响应式）；
- [ ] 根据配置文件动态生成路由，且根据路由分离代码；
- [ ] 重新封装 Axios 请求库，处理错误状态码；
- [ ] 编写使用文档。

[React]: https://reactjs.org/
[Ant Design]: https://ant.design/
[Ant Design Pro]: https://pro.ant.design/
[React Router]: https://github.com/ReactTraining/react-router
[Rematch]: https://github.com/rematch/rematch
[Axios]: https://github.com/axios/axios
[Uedlinker Scripts]: https://github.com/uedlinker/uedlinker-scripts
