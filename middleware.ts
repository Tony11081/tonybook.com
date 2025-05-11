// 简单中间件用于演示目的
export function middleware() {
  // 这里没有实际的认证逻辑，为了构建测试
}

export const config = {
  matcher: ['/api/:path*'],
} 