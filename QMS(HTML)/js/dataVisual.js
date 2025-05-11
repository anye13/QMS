// 初始化所有图表
function initCharts() {
    // 中间主图 - 答题趋势
    const mainChart = echarts.init(document.getElementById('main'));
    mainChart.setOption({
        title: { text: '每日答题趋势', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: { type: 'value' },
        series: [{
            name: '答题量',
            type: 'line',
            smooth: true,
            data: [120, 200, 150, 80, 70, 110, 130],
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#2196F3'
                }, {
                    offset: 1, color: '#E3F2FD'
                }])
            }
        }]
    });

    // 左侧1 - 正确率
    const left1 = echarts.init(document.getElementById('left1'));
    left1.setOption({
        title: { text: '正确率分布', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
                { value: 335, name: '正确' },
                { value: 135, name: '错误' }
            ],
            itemStyle: {
                borderRadius: 5,
                color: function (params) {
                    return params.name === '正确' ? '#4CAF50' : '#F44336';
                }
            }
        }]
    });

    // 左侧2 - 题型分布
    const left2 = echarts.init(document.getElementById('left2'));
    left2.setOption({
        title: { text: '题型分布', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['选择题', '填空题', '解答题'] },
        yAxis: { type: 'value' },
        series: [{
            type: 'bar',
            data: [120, 200, 150],
            itemStyle: { color: '#2196F3' }
        }]
    });

    // 右侧1 - 难度分布
    const right1 = echarts.init(document.getElementById('right1'));
    right1.setOption({
        title: { text: '难度分布', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            roseType: 'radius',
            radius: ['30%', '60%'],
            data: [
                { value: 40, name: '简单' },
                { value: 35, name: '中等' },
                { value: 25, name: '困难' }
            ],
            color: ['#4CAF50', '#FFC107', '#F44336']
        }]
    });

    // 右侧2 - 用时分布
    const right2 = echarts.init(document.getElementById('right2'));
    right2.setOption({
        title: { text: '答题用时分布', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: ['<1min', '1-3min', '3-5min', '>5min']
        },
        yAxis: { type: 'value' },
        series: [{
            type: 'bar',
            data: [80, 120, 60, 30],
            itemStyle: { color: '#9C27B0' }
        }]
    });
}

// 响应式调整
window.addEventListener('resize', () => {
    echarts.getInstanceByDom(document.getElementById('main')).resize();
    echarts.getInstanceByDom(document.getElementById('left1')).resize();
    echarts.getInstanceByDom(document.getElementById('left2')).resize();
    echarts.getInstanceByDom(document.getElementById('right1')).resize();
    echarts.getInstanceByDom(document.getElementById('right2')).resize();
});

// 初始化
document.addEventListener('DOMContentLoaded', initCharts);