// 记录当前选中的指标
    var currentSelectedRing = null;
    
    // 页面加载时执行环形图动画
    document.addEventListener('DOMContentLoaded', function() {
        animateRings();
    });
    
    // 环形图动画
    function animateRings() {
        document.querySelectorAll('.ring-progress').forEach(function(ring) {
            var item = ring.closest('.ring-item');
            var percent = item.getAttribute('data-value');
            var circumference = 251.2;
            var offset = circumference - (percent / 100) * circumference;
            ring.style.strokeDashoffset = offset;
        });
    }
    
    // 视图切换
    function switchView(view) {
        // 隐藏所有视图
        document.querySelectorAll('.chart-view').forEach(function(v) {
            v.style.display = 'none';
        });
        // 显示目标视图
        document.getElementById(view + '-view').style.display = 'block';
        
        // 更新按钮状态
        document.querySelectorAll('.view-btn').forEach(function(btn) {
            btn.classList.remove('active');
            btn.style.background = '#f8fafc';
            btn.style.color = '#475569';
        });
        event.target.classList.add('active');
        event.target.style.background = '#475569';
        event.target.style.color = '#f8fafc';
        
        // 重新触发动画
        if (view === 'rings') {
            document.querySelectorAll('.ring-progress').forEach(function(ring) {
                ring.style.strokeDashoffset = '251.2';
            });
            setTimeout(animateRings, 100);
        }
    }
    
    // 环形图点击选择（切换指标保存率/恢复总体）
    function selectRing(element) {
        var item = element;
        var name = item.getAttribute('data-name');
        var value = item.getAttribute('data-value');
        var rateDisplay = document.getElementById('rate-display');
        var totalRate = document.getElementById('total-rate');
        
        // 如果点击的是已选中的指标，恢复总体保存率
        if (currentSelectedRing === item) {
            item.classList.remove('selected');
            currentSelectedRing = null;
            // 恢复总体保存率
            rateDisplay.innerHTML = '★ 总体保存率：<span id="total-rate" style="color:#475569;">84%</span> ★';
        } else {
            // 取消之前选中的
            if (currentSelectedRing) {
                currentSelectedRing.classList.remove('selected');
            }
            // 选中新指标
            item.classList.add('selected');
            currentSelectedRing = item;
            
            // 根据数值确定颜色
            var color;
            if (value >= 95) {
                color = '#d4af37';
            } else if (value >= 80) {
                color = '#94a3b8';
            } else if (value >= 60) {
                color = '#64748b';
            } else {
                color = '#6d4c41';
            }
            
            // 直接替换显示内容为指标保存率
            rateDisplay.innerHTML = '★ ' + name + '保存率：<span style="color:' + color + ';">' + value + '%</span> ★';
        }
    }
    
    // 翻转卡片
    function flipCard(card) {
        card.classList.toggle('flipped');
    }
    
    // 图片弹窗
    function showLionDetail(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        modal.classList.add('modal-animate');
    }
    
    function closeLionModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.classList.remove('modal-animate');
        modal.style.display = 'none';
    }
    function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            // 全屏后等待一下，再滚动到被遮挡的文字
            setTimeout(() => {
                // 被遮挡的文字（根据你的 HTML）
                const target = document.querySelector('.right-column .text-block:last-child');
                if (target) {
                    // 粘滞元素高度（不改它，只用来计算偏移）
                    const sticky = document.querySelector('.section-title, .main-title');
                    const stickyHeight = sticky ? sticky.offsetHeight : 60;
                    const offset = target.getBoundingClientRect().top + window.scrollY - stickyHeight;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                } else {
                    console.warn('没找到被遮挡的元素，请检查选择器');
                }
            }, 100);
        }).catch(err => console.warn('全屏失败', err));
    } else {
        document.exitFullscreen();
    }
}