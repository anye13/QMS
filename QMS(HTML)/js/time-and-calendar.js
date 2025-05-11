// 初始化日期选择器
function initDatePicker() {
    const yearSelect = document.getElementById('yearSelect');
    let currentYear = new Date().getFullYear();
    // 初始加载最近5年
    loadYears(yearSelect, currentYear - 4, currentYear);
    const monthSelect = document.getElementById('monthSelect');

    // 填充月份
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.text = month + '月';
        option.selected = month === new Date().getMonth() + 1;
        monthSelect.appendChild(option);
    }

    // 添加事件监听
    yearSelect.addEventListener('change', generateCalendar);
    monthSelect.addEventListener('change', generateCalendar);
}
// 动态加载年份函数
function loadYears(selectElement, startYear, endYear) {
    // 淡出多余选项（保留10个）
    while (selectElement.options.length > 5) {
        selectElement.options[0].style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => selectElement.remove(0), 300);
    }

    // 添加新选项并设置淡入动画
    for (let year = startYear; year <= endYear; year++) {
        const option = new Option(year + '年', year);
        option.style.animation = 'fadeIn 0.3s forwards';
        option.selected = year === new Date().getFullYear();
        selectElement.add(option);
    }
}
// 动态生成日历
function generateCalendar() {
    const year = parseInt(document.getElementById('yearSelect').value);
    const month = parseInt(document.getElementById('monthSelect').value);
    const calendar = document.getElementById('calendar-grid');
    // 使用文档片段批量操作DOM
    const fragment = document.createDocumentFragment();
    // 计算当月天数
    const daysInMonth = new Date(year, month, 0).getDate();
    calendar.innerHTML = '';

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.innerHTML = `<div class="day-number" onclick="showDateDetail(${i})">${i}</div>`;
        dayElement.onclick = () => showDateDetail(i);  // 添加容器点击事件
        fragment.appendChild(dayElement);
    }
    // 单次DOM操作添加所有日期
    calendar.appendChild(fragment);
}

function showDateDetail(day) {
    // 立即移除所有现有提示元素
    const existingDetails = document.querySelectorAll('.date-detail');
    existingDetails.forEach(el => {
        el.style.animation = 'none';
        el.remove();
    });
    const detail = document.createElement('div');
    detail.className = 'date-detail';
    detail.innerHTML = `📅 ${day}号学习记录：完成12道题`;
    detail.style.animation = 'fadeInUp 0.3s ease-out forwards';
    detail.style.position = 'fixed';  // 改为fixed定位
    detail.style.bottom = '5%';       // 距离底部5%
    detail.style.left = '50%';
    detail.style.transform = 'translateX(-50%)';
    document.querySelector('.calendar-box').appendChild(detail);

    // 使用独立定时器变量便于清除
    let fadeTimer = setTimeout(() => {
        detail.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => detail.remove(), 300);
    }, 2000);

    // 添加点击事件立即清除
    detail.addEventListener('click', () => {
        clearTimeout(fadeTimer);
        detail.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => detail.remove(), 150);
    });
}

// 初始化时同时加载选择器和日历
window.addEventListener('load', () => {
    initDatePicker();
    generateCalendar();
});