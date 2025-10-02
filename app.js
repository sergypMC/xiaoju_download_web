// 初始化下载项数据
const downloads = [
  {
    id: 'modpack-001',
    name: '小橘の海豹偷狗队枪械整合包',
    size: '112 MB (117,598,962 字节)',
    category: 'modpack',
    netdisk: 'https://workdrive.zohopublic.com.cn/external/4278f7d8b1ada4f99e6642b2c5e19a4e31adf210b5645005d2026d3d2953a91b/download',
    direct: 'https://files.zohopublic.com.cn/public/workdrive-public/download/f0nwcf4ae18dfbb37428199784e70efae6d53?x-cli-msg=%7B%22linkId%22%3A%221HPLRIHTMwz-36YKM%22%2C%22isFileOwner%22%3Afalse%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D'
  }
  
  {
    id: 'modpack-002',
    name: '小橘の身存优化整合包',
    size: '35.3 KB (36,201 字节)',
    category: 'modpack',
    netdisk: 'https://workdrive.zohopublic.com.cn/external/e2093952057131a6c8c6ae1699477278ba80a2c11dd7477704e2f9a3d794fb75/download',
    direct: 'https://files.zohopublic.com.cn/public/workdrive-public/download/f0nwc3c0c27b8fff04ff58869f7dacac83222?x-cli-msg=%7B%22linkId%22%3A%221HPLRIHTMwA-36YKM%22%2C%22isFileOwner%22%3Afalse%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D'
  }
  
];

// 初始化文件列表
function initFileList() {
  const containers = {
    'tools': document.getElementById('toolsList'),
    'docs': document.getElementById('docsList'),
    'modpack': document.getElementById('modsList')
  };

  downloads.forEach(file => {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.innerHTML = `
      <div class="file-info">
        <div class="file-name">${file.name}</div>
        <div class="file-size">${file.size}</div>
      </div>
      <div class="action-menu">
        <button onclick="handleAction('${file.netdisk}', 'netdisk')">网盘下载</button>
        <button onclick="handleAction('${file.direct}', 'direct')">直接下载</button>
        <button onclick="handleAction('${file.doc}', 'doc')">使用文档</button>
      </div>
    `;
    card.dataset.fileId = file.id; // 正确绑定文件ID到DOM元素
    const containers = {
      'tools': toolsList,
      'docs': docsList,
      'modpack': modpackList
    };
    
    // 智能分配文件到对应容器
    (containers[file.category] || containers.docs).appendChild(card);
  });
}

// 实现搜索功能
// 修改搜索逻辑
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchMode = document.getElementById('searchMode');
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const isIdSearch = searchMode.checked;
    
    // 修改搜索逻辑
    console.log('当前搜索模式:', isIdSearch ? 'ID' : '名称');
    document.querySelectorAll('.file-card').forEach(card => {
      console.log('文件ID:', card.dataset.fileId);
      console.log('匹配结果:', match);
      const fileId = card.dataset.fileId.toLowerCase();
      const fileName = card.querySelector('.file-name').textContent.toLowerCase();
      const match = isIdSearch ? fileId.includes(query) : fileName.includes(query);
      card.style.display = match ? '' : 'none';
    });
  });
}

// 页面加载初始化
document.addEventListener('DOMContentLoaded', () => {
  initFileList();
  setupSearch();
});


function handleAction(url, type) {
  const actions = {
    'netdisk': () => window.open(url),
    'direct': () => location.href = url,
    'doc': () => window.open(url || 'docs/default.html')
  };
  actions[type]?.();
}
