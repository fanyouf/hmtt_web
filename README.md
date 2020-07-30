# hmtt_web

在master分支中，只有基础代码，你需要切换到对应的分支去查看相关的代码。基础代码采用`vue create http_web`命令创建而来。

## 具体参数

1. @vue/cli 的版本是4.4.6

```
Vue -v
> @vue/cli 4.4.6
```

2. 创建项目时，采用的配置项是：

   - 手动选择特性，具体有：Babel, Router,Vuex,CSS Pre-processors, Linter

     ```
     ? Check the features needed for your project:
      (*) Babel
      ( ) TypeScript
      ( ) Progressive Web App (PWA) Support
      (*) Router
      (*) Vuex
      (*) CSS Pre-processors
      (*) Linter / Formatter
      ( ) Unit Testing
      ( ) E2E Testing
     ```

     > 方向键移动选择项，空格键 确定/取消 选择

   - 路由是否使用history模式：不采用

     ```
     ? Use history mode for router?(Requires proper server setup for index fallback in production) (Y/n) n
     ```

   - css 预处理器: 选用less

     ```
     ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
      Sass/SCSS (with dart-sass)
      Sass/SCSS (with node-sass)
      Less (选中)
      Stylus
     ```

   - 语法风格：Standard

     ```
     ? Pick a linter / formatter config:
       ESLint with error prevention only
       ESLint + Airbnb config
       ESLint + Standard config（选中）
       ESLint + Prettier
      
     ```

   - Eslint的额外设置：保存时检查，提交时检查

     ```
     ? Pick additional lint features:
     (*) Lint on save
     (*) Lint and fix on commit
     ```

   - 存储插件配置位置：单独放在不同的文件中 in dedicated config files。

     ```
     where do you prefer placing config for Babel, PostCSS, ESLint, etc. ?
     > In dedicated config files (选中)
     > In package.json
     ```

   选择完成之后，开始创建。

## 克隆指定分支

格式:

```
git clone -b 分支名 https://gitee.com/fanyoufu2/hmtt_web.git
```

示例：

​	目标：从本仓库中克隆出名为dev108的分支。

​	命令：git clone -b dev108 https://gitee.com/fanyoufu2/hmtt_web.git

## 代码运行

当代码克隆完成之后：1） 进入目录， 2） 安装依赖  3）启动项目

```bash
## 0）克隆指定仓库
git clone -b dev108 https://gitee.com/fanyoufu2/hmtt_web.git
## 1） 进入目录
cd http_web
## 2） 安装依赖
npm i 
## 3）启动项目
npm run serve
```