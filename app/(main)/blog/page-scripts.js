// 这个文件包含博客页面的客户端脚本

// 监听滚动事件，更新阅读进度条
document.addEventListener('DOMContentLoaded', function() {
  // 获取进度条元素
  const progressBar = document.getElementById('reading-progress');
  
  if (!progressBar) return;
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    // 计算滚动百分比
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    
    // 更新进度条宽度
    progressBar.style.width = scrollPercent + '%';
  });

  // 滚动到最顶部时隐藏进度条
  window.addEventListener('scroll', function() {
    if (window.scrollY <= 10) {
      progressBar.style.opacity = '0';
    } else {
      progressBar.style.opacity = '1';
    }
  });
});

// 搜索功能实现
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('input[type="search"]');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('keypress', function(e) {
    // 按下回车键时执行搜索
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // 跳转到搜索结果页面
        window.location.href = '/blog?search=' + encodeURIComponent(searchTerm);
      }
    }
  });
});

// 分类标签交互效果
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const currentCategory = urlParams.get('cat');
  
  // 获取所有分类标签
  const categoryLinks = document.querySelectorAll('.mt-6.flex.flex-wrap.justify-center.gap-2 a');
  
  categoryLinks.forEach(link => {
    // 提取链接中的分类参数
    const linkParams = new URLSearchParams(new URL(link.href, window.location.origin).search);
    const linkCategory = linkParams.get('cat');
    
    // 如果当前分类与链接分类匹配，添加活跃状态样式
    if (currentCategory === linkCategory) {
      link.classList.add('ring-2', 'ring-offset-2');
      
      // 根据分类添加不同颜色的环
      if (linkCategory === 'ecommerce') {
        link.classList.add('ring-purple-400');
      } else if (linkCategory === 'ai') {
        link.classList.add('ring-green-400');
      } else if (linkCategory === 'automation') {
        link.classList.add('ring-amber-400');
      } else if (linkCategory === 'google-ads') {
        link.classList.add('ring-blue-400');
      } else if (linkCategory === 'data') {
        link.classList.add('ring-rose-400');
      } else if (linkCategory === 'startup') {
        link.classList.add('ring-indigo-400');
      }
    }
  });
  
  // 对订阅表单添加简单验证
  const emailInput = document.querySelector('input[type="email"]');
  const subscribeButton = emailInput?.nextElementSibling;
  
  if (emailInput && subscribeButton) {
    subscribeButton.addEventListener('click', function(e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      if (!email || !email.includes('@') || !email.includes('.')) {
        emailInput.classList.add('ring-2', 'ring-red-500');
        return;
      }
      
      // 移除错误样式
      emailInput.classList.remove('ring-2', 'ring-red-500');
      
      // 显示成功信息
      const successMessage = document.createElement('p');
      successMessage.textContent = '订阅成功！感谢您的关注。';
      successMessage.className = 'text-green-600 dark:text-green-400 mt-2';
      
      const parent = subscribeButton.parentElement;
      if (!parent.querySelector('.text-green-600')) {
        parent.appendChild(successMessage);
      }
      
      // 实际项目中这里应该发送到后端API
    });
    
    // 输入时移除错误状态
    emailInput.addEventListener('input', function() {
      emailInput.classList.remove('ring-2', 'ring-red-500');
    });
  }
}); 