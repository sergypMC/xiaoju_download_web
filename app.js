const downloads = [
  {
    id: 'modpack-001',
    name: '小橘の养老生存整合包',
    size: '36.0 KB (36,864 字节)',
    category: 'modpack',
    netdisk: 'https://workdrive.zoho.com.cn/file/f0nwc3c0c27b8fff04ff58869f7dacac83222',
    direct: 'https://download.zoho.com.cn/v1/workdrive/download/f0nwc3c0c27b8fff04ff58869f7dacac83222?x-cli-msg=%7B%22isFileOwner%22%3Atrue%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D'
  },
  {
    id: 'modpack-002',
    name: '小橘の海豹偷狗队枪械整合包',
    size: '112 MB (117,598,962 字节)',
    category: 'modpack',
    netdisk: 'https://workdrive.zoho.com.cn/file/f0nwcf4ae18dfbb37428199784e70efae6d53',
    direct: 'https://download.zoho.com.cn/v1/workdrive/download/f0nwcf4ae18dfbb37428199784e70efae6d53?x-cli-msg=%7B%22isFileOwner%22%3Atrue%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D'
  },  // 修复：添加逗号分隔数组元素
  {
    id: 'modpack-003',
    name: '小橘の奇奇怪怪MC整合包V1',
    size: '957 KB (980,564 字节)',
    category: 'modpack',
    netdisk: 'https://workdrive.zohopublic.com.cn/external/0bb6201db52fe662410816a17d43a5eacf5b462f833fc20ebd10c0f71d785e66/download',
    direct: 'https://files.zohopublic.com.cn/public/workdrive-public/download/f0nwcab3eab3071af47d589985d475039ebac?x-cli-msg=%7B%22linkId%22%3A%221HPLRIHTORz-36YKM%22%2C%22isFileOwner%22%3Afalse%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D'
  }
  {
    id: 'tools-001',
    name: '小橘のCS启动器',
    size: '36.0 KB (36,864 字节)',
    category: 'tools',
    netdisk: 'https://workdrive.zohopublic.com.cn/external/270108d2777adab2808a792c43d3430d72ef7a35db2b91871b9f603d205c4d16/download',
    direct: 'https://files.zohopublic.com.cn/public/workdrive-public/download/f0nwc775dfe811fb942198bc829461c7a9d7a?x-cli-msg=%7B%22linkId%22%3A%221HPLRIHTMwB-36YKM%22%2C%22isFileOwner%22%3Afalse%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D'
  },
];


// 初始化文件列表
function initFileList() {
  const containers = {
    'tools': document.getElementById('toolsList'),
    'docs': document.getElementById('docsList'),
    'modpack': document.getElementById('modpackList')
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
        <button onclick="handleAction('${file.doc || ''}', 'doc')">使用文档</button>  <!-- 修复：处理doc属性可能不存在的情况 -->
      </div>
    `;
    card.dataset.fileId = file.id;
    (containers[file.category] || containers.docs).appendChild(card);
  });
}

// 实现搜索功能
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchMode = document.getElementById('searchMode');
  
  if (!searchInput || !searchMode) {  // 修复：避免DOM元素不存在导致的报错
    console.warn('搜索相关元素未找到，搜索功能已禁用');
    return;
  }
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const isIdSearch = searchMode.checked;
    
    document.querySelectorAll('.file-card').forEach(card => {
      const fileId = card.dataset.fileId.toLowerCase();
      const fileName = card.querySelector('.file-name')?.textContent.toLowerCase() || '';  // 修复：处理可能不存在的元素
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
    'netdisk': () => url && window.open(url),  // 修复：避免空链接导致的错误
    'direct': () => url && (location.href = url),
    'doc': () => window.open(url || 'docs/default.html')
  };
  actions[type]?.();
}
