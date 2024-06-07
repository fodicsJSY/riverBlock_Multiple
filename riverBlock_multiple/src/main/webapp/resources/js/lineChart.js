let cameraNameList;
let lineDataList; 
let dateDataChart;



function lineChart(cameras, lineDataList01) {
    // console.log("linechart cameras : ", cameras);
    // console.log("linechart lineDataList01 : ", lineDataList01);
    
    lineDataList = lineDataList01.result;
    
    let chartCameraList= {};

    // console.log("lineDataList", lineDataList);
    
    
    // var chartCameraList =[];
    // var chartDataList =[];
    // var chartTimeList =[];
    
    // // console.log("안나와");
    
    // // console.log("lineDataList.length", lineDataList.length);
    // for(let j = 0; j < lineDataList.length; j++){
    //     // console.log("왜 안나와");
    //     // console.log("j", j);
    //     // console.log("lineDataList[j]", lineDataList[j]);
    //     chartCameraList.push(lineDataList[j][0]);
    //     chartDataList.push(lineDataList[j][1]);
    //     chartTimeList.push(lineDataList[j][2]);
    // }
    
    // // console.log("chartCameraList", chartCameraList);
    // // console.log("chartDataList", chartDataList);
    // // console.log("chartTimeList", chartTimeList);

    // // console.log("일별 구동 차트");
    
    // 이전에 있던 차트 객체가 있으면 삭제
    if (dateDataChart) {
        dateDataChart.dispose();
    }
    
    
    
    
    // 시간대별로 구동 횟수를 누적할 객체
    const cameraData = {};
    
    // 데이터 처리
    lineDataList.forEach(item => {
        const cameraName = item[0]; // 카메라명
        const hour = parseInt(item[1]); // 시간
        const count = parseInt(item[2]); // 구동횟수
        
        // 해당 카메라명이 없으면 새로운 객체로 초기화
        if (!cameraData[cameraName]) {
            cameraData[cameraName] = Array(24).fill(0); // 24시간을 0으로 초기화
        }
        
        // 시간대별 구동횟수 누적
        cameraData[cameraName][hour] += count;
    });
    
    // 최종 시리즈 데이터 생성
    const seriesData = Object.keys(cameraData).map(cameraName => ({
        name: cameraName,
        type: 'line',
        data: cameraData[cameraName]
    }));
    
    // console.log(seriesData);
    
    
    
    dateDataChart = echarts.init(document.getElementById('dateData'));


    const colors = ['#00A9FF', '#FFB840', '#FF5A46', '#00BD9F', '#785FFF', '#F28B8C', '#989486', '#516F7D', '#28E6EB', '#28695F'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            right: '2%', // 오른쪽으로 이동
            top: 'middle', // 세로 중앙 정렬
            textStyle: {
                color: '#FFFFF' 
            },
            data: chartCameraList[cameras]
        },
        grid: {
            left: '3%',
            right: '15%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category', // x축 타입을 category로 변경
            boundaryGap: false,
            data: Array.from({ length: 24 }, (_, i) => i + 1), // 1부터 31까지의 배열 생성
            splitLine: {    // x축의 분할선 설정
                show: true, // 분할선 표시 여부
                axisLine: {    // x축에 대한 스타일 설정
                    lineStyle: {
                        color: '#CCCCCC',  // 구분선의 색상 설정
                        width: 1,       // 구분선의 너비 설정
                        type: 'solid'   // 구분선의 종류 설정 (solid, dashed, dotted 등)
                    }
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {    // y축의 분할선 설정
                show: true, // 분할선 표시 여부
                axisLine: {    // y축에 대한 스타일 설정
                    lineStyle: {
                        color: '#CCCCCC',  // 구분선의 색상 설정
                        width: 1,       // 구분선의 너비 설정
                        type: 'solid'   // 구분선의 종류 설정 (solid, dashed, dotted 등)
                    }
                },
            }
        },
        series: seriesData
    };

    dateDataChart.setOption(option);
}




