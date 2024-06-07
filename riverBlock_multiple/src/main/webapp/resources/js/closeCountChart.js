let closeGateList; 
var closeCountChart;

function closeDounutChart(data){

    closeGateList = data.result;
    // console.log("closeGateList", closeGateList );

    let closeTimeCnt0 = closeGateList[0][0];
    let closeTimeCnt1 = closeGateList[0][1];
    let closeTimeCnt2 = closeGateList[0][2];
    let closeTimeCnt3 = closeGateList[0][3];
    let closeTimeCnt4 = closeGateList[0][4];
    let closeTimeCnt5 = closeGateList[0][5];
    // // console.log("closeTimeCnt0", closeTimeCnt0 );

    // // console.log("시간별 폐문 차트");

    // 이전에 있던 차트 객체가 있으면 삭제
    if (closeCountChart || closeGateList == null) {
        closeCountChart.dispose();
    }



    closeCountChart = echarts.init(document.getElementById('closeCount'));
    
    option = {
        legend: {
            orient: 'vertical',
            right: 0, // 오른쪽으로 이동
            top: 'middle', // 세로 중앙 정렬
            textStyle: {
                color: '#FFF' 
            }
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '80%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderColor: '#1E1E1E',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'inside', // 레이블 위치 설정
                formatter: '{c}',
                fontSize: 20, 
            },
            emphasis: {
                label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: closeTimeCnt0, name: '새벽/오전', itemStyle: { color: '#00A9FF' } },
                { value: closeTimeCnt1, name: '점심시간', itemStyle: { color: '#FFB840' } },
                { value: closeTimeCnt2, name: '오후', itemStyle: { color: '#FF5A46' } },
                { value: closeTimeCnt3, name: '퇴근시간', itemStyle: { color: '#00BD9F' } },
                { value: closeTimeCnt4, name: '저녁', itemStyle: { color: '#785FFF' } },
                { value: closeTimeCnt5, name: '심야', itemStyle: { color: '#F28B8C' } }
            ]
            }
        ]
    };
    
    closeCountChart.setOption(option);

}