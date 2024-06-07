
function resizeChart() {
    openCountChart.resize();
    closeCountChart.resize();
    dateDataChart.resize();
}

// 창 크기가 변경될 때 차트 크기를 자동으로 조절
window.addEventListener('resize', resizeChart);