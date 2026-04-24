/* ==================== 交互脚本 ==================== */

// 图片点击查看大图
document.querySelectorAll('.hero-image img, .grid-image, .icon-box:not(.lion-detail-btn), .structure-sketch, .sketch-area, .sketch-image').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const imgSrc = this.tagName === 'IMG' ? this.src : '';
        const alt = this.getAttribute('alt') || this.getAttribute('data-label') || '图片预览';
        
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('modalCaption');
        
        if (imgSrc || this.classList.contains('structure-sketch') || this.classList.contains('sketch-area')) {
            modal.style.display = 'block';
            if (imgSrc) {
                modalImg.src = imgSrc;
            } else {
                modalImg.src = '';
                modalImg.alt = alt;
                modalImg.style.background = '#f0f4f8';
                modalImg.style.width = '600px';
                modalImg.style.height = '400px';
            }
            caption.textContent = alt;
            document.body.style.overflow = 'hidden';
        }
    });
});

// 关闭模态框
function closeModal(e) {
    if (e.target.id === 'imageModal' || e.target.classList.contains('modal-close')) {
        document.getElementById('imageModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        const modalImg = document.getElementById('modalImage');
        modalImg.style.background = '';
        modalImg.style.width = '';
        modalImg.style.height = '';
    }
}

// ESC关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal({ target: { id: 'imageModal' } });
    }
});

// 全屏切换
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 打印功能
function printBoard() {
    window.print();
}

// 展板切换
let currentBoard = 1;
const boards = document.querySelectorAll('.board');
const totalPages = boards.length;

document.getElementById('totalPages').textContent = totalPages;

function updateBoard() {
    boards.forEach((board, index) => {
        if (index + 1 === currentBoard) {
            board.classList.remove('hidden');
            board.style.opacity = '1';
        } else {
            board.classList.add('hidden');
            board.style.opacity = '0';
        }
    });
    document.getElementById('currentPage').textContent = currentBoard;
}

function prevBoard() {
    if (currentBoard > 1) {
        currentBoard--;
        updateBoard();
        showKeyHint('上一页');
    }
}

function nextBoard() {
    if (currentBoard < totalPages) {
        currentBoard++;
        updateBoard();
        showKeyHint('下一页');
    }
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevBoard();
    } else if (e.key === 'ArrowRight') {
        nextBoard();
    } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    } else if (e.key === 'p' || e.key === 'P') {
        printBoard();
    }
});

// 显示键盘提示
function showKeyHint(text) {
    let hint = document.querySelector('.key-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'key-hint';
        document.body.appendChild(hint);
    }
    hint.textContent = text;
    hint.classList.add('show');
    setTimeout(() => {
        hint.classList.remove('show');
    }, 1000);
}

// 卡片点击涟漪效果
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(196, 169, 125, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// 添加涟漪动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
    updateBoard();
});

// 键盘快捷键 ESC 关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var modals = document.querySelectorAll('[id$="Modal"]');
        modals.forEach(function(modal) {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }
});
function updatePageNumbers() {
    const boards = document.querySelectorAll('.board');
    const total = boards.length;
    
    boards.forEach((board, index) => {
        const pageNum = board.querySelector('.page-number');
        if (pageNum) {
            pageNum.textContent = `${(index + 1).toString().padStart(2, '0')} / ${total.toString().padStart(2, '0')}`;
        }
    });
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', updatePageNumbers);

// 打印前再调用一次，确保页码正确
window.addEventListener('beforeprint', updatePageNumbers);
function printBoard() {
    // 先滚动到目标文字
    const text = document.querySelector('.被遮挡的文字的类或id');
    if (text) {
        const sticky = document.querySelector('.your-sticky-class');
        const stickyHeight = sticky ? sticky.offsetHeight : 0;
        const offsetTop = text.getBoundingClientRect().top + window.scrollY - stickyHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        
        // 滚动完再打印
        setTimeout(() => {
            window.print();
        }, 200);
    } else {
        window.print();
    }
}
function printBoard() {
    // 先滚动到目标文字
    const text = document.querySelector('.被遮挡的文字的类或id');
    if (text) {
        const sticky = document.querySelector('.your-sticky-class');
        const stickyHeight = sticky ? sticky.offsetHeight : 0;
        const offsetTop = text.getBoundingClientRect().top + window.scrollY - stickyHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        
        // 滚动完再打印
        setTimeout(() => {
            window.print();
        }, 200);
    } else {
        window.print();
    }
}
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            setTimeout(() => {
                const sticky = document.querySelector('.your-sticky-class');
                const blocked = document.querySelector('.被遮挡的文本');
                if (sticky && blocked) {
                    window.scrollTo(0, blocked.offsetTop - sticky.offsetHeight);
                }
            }, 100);
        });
    } else {
        document.exitFullscreen();
    }
}