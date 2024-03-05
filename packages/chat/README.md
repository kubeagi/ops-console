# 对话组件

@yuntijs/chat

---

## 开发

### 发布版本：

```bash
$ nr pub
```

### 在 agent-portal 中使用

nextJS 中不允许引入全局less, 临时解决方案：

打包完成后, 将 `dist/umd/index.min.css` 复制到 agent-portal 的 `public/style/yunti-chat.min.css`
