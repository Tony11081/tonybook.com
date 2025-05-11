# ShopChina

ShopChina是一个帮助用户浏览和购买中国电商平台商品的应用程序。该平台提供了语言翻译、店铺验证以及全球配送解决方案。

## 技术栈

- **前端**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **认证**: Clerk
- **数据库**: PostgreSQL with Drizzle ORM
- **内容管理**: Sanity
- **缓存**: Upstash Redis
- **测试**: Jest, React Testing Library

## 安装与设置

```bash
# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 构建生产版本
pnpm build

# 运行生产版本
pnpm start
```

## 环境变量

在项目根目录创建`.env.local`文件，并参照`env.example`添加必要的环境变量。

## 项目结构

- `/app` - Next.js App Router结构
- `/components` - 可复用React组件
- `/db` - 数据库模式和连接
- `/lib` - 工具函数和服务
- `/public` - 静态资源
- `/styles` - 全局样式

## 特性

- 响应式设计
- 深色/浅色模式
- 动画UI
- 商品类别浏览
- 店铺验证系统
- 国际物流跟踪

## 许可

MIT 