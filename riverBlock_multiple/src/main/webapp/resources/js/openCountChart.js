let openGateList; 
var openCountChart;

function openDounutChart(data){
    // console.log("data : ", data.result);
    openGateList = data.result;

        // 이전에 있던 차트 객체가 있으면 삭제
        if (openCountChart || openGateList == null) {
            openCountChart.dispose();
        }
    
    let openTimeCnt0 = openGateList[0][0];
    // // console.log("openTimeCnt0", openTimeCnt0 );
    let openTimeCnt1 = openGateList[0][1];
    let openTimeCnt2 = openGateList[0][2];
    let openTimeCnt3 = openGateList[0][3];
    let openTimeCnt4 = openGateList[0][4];
    let openTimeCnt5 = openGateList[0][5];
    // console.log("openTimeCnt0", openTimeCnt0 );
    // console.log("시간별 개문 차트");

    openCountChart = echarts.init(document.getElementById('openCount'));


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
                    formatter: '{c}' ,
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
                    { value: openTimeCnt0, name: '새벽/오전', itemStyle: { color: '#00A9FF' } },
                    { value: openTimeCnt1, name: '점심시간', itemStyle: { color: '#FFB840' } },
                    { value: openTimeCnt2, name: '오후', itemStyle: { color: '#FF5A46' } },
                    { value: openTimeCnt3, name: '퇴근시간', itemStyle: { color: '#00BD9F' } },
                    { value: openTimeCnt4, name: '저녁', itemStyle: { color: '#785FFF' } },
                    { value: openTimeCnt5, name: '심야', itemStyle: { color: '#F28B8C' } }
                ]
            }
        ]
    };

    openCountChart.setOption(option);
}

