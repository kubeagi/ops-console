# ops-console

Operations console for KubeAGI

---

## 开发构建

### 快速开始

克隆项目:

```bash
git clone https://github.com/kubeagi/ops-console.git
# 如果还没有 git 地址，可以先在项目中执行 git init --initial-branch=main 后再初始化 submodule
git submodule add https://github.com/kubebb/portal-contrib.git
```

环境要求：

- **Node.js v18.x**
- **pnpm v8.x**

进入目录安装依赖:

```bash
npm i pnpm @antfu/ni -g
ni
```

开发：

```bash
# 首次开发时需要做下 api 配置
cp config/api.sample.ts config/api.ts

# 启动 portal
nr dev
```

### 构建

#### 仅构建静态文件

```bash
nr build
```

#### 构建镜像

执行以下命令可在本地构建镜像：

```bash
chmod +x ./build.sh ./update_base_image.sh
./build.sh
```

运行镜像：

```bash
docker run -d -p 8000:80 kubeagi/ops-console
```

然后浏览器中打开 http://localhost:8000/kubeagi-portal/test 即可访问 portal。

### 代码风格检查

初始化 git hooks 工具 husky：

```bash
npx husky add .husky/pre-commit 'npx --no-install lint-staged'
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
chmod +x .husky/pre-commit .husky/commit-msg
# 记得提交初始化好的 husky 脚本
git add .husky/
```

**注意：初始化项目后一定要再初始化下 git hooks 工具 husky，记得提交初始化好的 husky 脚本。**

执行 lint 检查：

```bash
nr lint
```

> 注意事项: lint 规则默认忽略了 js、jsx 及 css 文件，这些文件一般都是低代码平台自动生成的，如果要手动开发页面，请使用 ts、tsx 及 less。
