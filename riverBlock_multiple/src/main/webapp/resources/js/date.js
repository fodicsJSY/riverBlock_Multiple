


/* 전역변수 시작 */
var forDate;
/* 전역변수 끝 */

/* 오늘 날짜로 초기화 시작*/
// 페이지 로드 시 오늘 날짜로 초기화
document.addEventListener("DOMContentLoaded", ()=> {

    // inputDate 엘리먼트 초기화
    var inputDate = document.getElementById('inputDate');

    // iplist
    savedIPList = JSON.parse(localStorage.getItem('ipList'));
    // console.log("savedIPList", savedIPList);

    // forDate 변수 초기화
    forDate = new Date(inputDate.value);

    // inputDate 엘리먼트 값 변경 이벤트 핸들러 등록
    inputDate.addEventListener('change', function() {
        sendToServer(savedIPList, this.value);
    });

    // 초기화 함수 호출
    today();


    // 날짜 보내기 
    sendToServer(savedIPList, forDate);

});


/* 오늘 날짜로 초기화 끝*/
    
    document.getElementById('calenderButton').addEventListener('change', function() {
        inputDate.value = this.value;
        sendToServer(savedIPList, this.value);
    });


    document.getElementById('leftBtn').addEventListener("click", ()=>{
        // console.log("leftBtn클릭");
        beforeOneDay();
        sendToServer(savedIPList, this.value);
    });


    document.getElementById('rightBtn').addEventListener("click", ()=>{
        // console.log("rightBtn클릭");
        afterOneDay();
        sendToServer(savedIPList, this.value);
    });


    document.getElementById('yesterdayBtn').addEventListener("click", ()=>{
        // console.log("yesterdayBtn클릭");
        yesterday();
        sendToServer(savedIPList, this.value);
    });


    document.getElementById('todayBtn').addEventListener("click", ()=>{
        // console.log("todayBtn클릭");
        today();
        sendToServer(savedIPList, this.value);
    });


    document.getElementById('beforeWeekBtn').addEventListener("click", ()=>{
        // console.log("beforeWeekBtn클릭");
        before1weekBtn();
        sendToServer(savedIPList, this.value);
    });




// 하루 전으로 초기화 
function beforeOneDay(){
    var inputDate = new Date(document.getElementById('inputDate').value);
    inputDate.setDate(inputDate.getDate() - 1);
    var formattedDate = inputDate.toISOString().substring(0, 10);
    document.getElementById('inputDate').value = formattedDate;
    forDate = formattedDate; // forDate 업데이트
    // console.log("하루 전 : ", forDate);

}


// 다음 날짜로 초기화
function afterOneDay(){
    var inputDate = new Date(document.getElementById('inputDate').value);
    inputDate.setDate(inputDate.getDate() + 1);
    var formattedDate = inputDate.toISOString().substring(0, 10);
    document.getElementById('inputDate').value = formattedDate;
    forDate = formattedDate; // forDate 초기화
    // console.log("다음 날짜 : ", forDate);
}


// 어제 날짜로 초기화
function yesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제의 날짜로 설정
    var formattedDate = yesterday.toISOString().substring(0, 10);
    inputDate.value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("어제 날짜 : ", forDate);
}


// 오늘 날짜로 초기화
function today(){
    var date = new Date;
    let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    var today = new Date(date.getTime() - offset);
    // console.log("today  : ", today);/
    var formattedDate = today.toISOString().substring(0, 10);
    inputDate.value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("today 오늘날짜 : ", forDate);
}

// 1주 전으로 초기화
function before1weekBtn(){
    var beforeOneWeek = new Date();
    beforeOneWeek.setDate(beforeOneWeek.getDate() - 7); 
    var formattedDate = beforeOneWeek.toISOString().substring(0, 10);
    document.getElementById('inputDate').value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("1주전 날짜 : ", forDate);
}


// input태그 날짜 직접 입력
inputDate.addEventListener('keyup', function() {
    // console.log("inputDate 변경됨 : ", this.value);
    sendToServer(savedIPList, this.value);
});



let data;

/* 날짜 보내기 */
// async function sendToServer(savedIP, value) {
async function sendToServer(savedIPList, value) {
    // 형식을 YYYYMMDD로 변경
    let occuDate = formatToYYYYMMDD(value || forDate);
    // console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력


    // // fetchData2 함수를 호출하고 결과를 처리하는 예제
    (async () => {
        try {
            await fetchData(savedIPList, occuDate);
            // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
        } catch (error) {
            // console.error('Error occurred:', error);
        }
    })();

}




async function fetchData(savedIPList, occuDate) {
    // console.log("여기!");
    // console.log("savedIPList", savedIPList);
    // console.log("savedIPList[0]", savedIPList[0]);
    // console.log("savedIPList[1]", savedIPList[1]);

    
    const takeIPList = savedIPList;
    // console.log("takeIPList", takeIPList);
    // console.log("takeIPList[0]", takeIPList[0]);
    // console.log("takeIPList[1]", takeIPList[1]);

    
    
    // var DBip = "172.16.0.93";
    // console.log('fetchData occuDate:', occuDate); // 콘솔에 occuDate 값 로그 출력
    // console.log('fetchData savedIP:', savedIP); // 콘솔에 savedIP 값 로그 출력
    
    

    try {
        // console.log("호출!");



        // Query 1 호출
        const result1 = await fetch("/openDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[0],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 1, '"+ occuDate +"', '"+ occuDate +"', ''",
                "port" : 12000,
                // "query": "SELECT * FROM TB_TEMP_RESULT",
                "id":"",
                "pw":""
            })
        });

        if (!result1.ok) {
            throw new Error('Network response was not ok');
        }

        const openDataList = await result1.json();
        // console.log("openDataList", openDataList);
        // console.log("result1", result1);



        // Query 1 받기
        const result1_1 = await fetch("/openDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[0],
                // "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 1, '"+ occuDate +"', '"+ occuDate +"', ''",
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result1.ok) {
            throw new Error('Network response was not ok');
        }

        const openDataList01 = await result1_1.json();
        // console.log("openDataList01", openDataList01);
        // console.log("result1_1", result1_1);


        // openDounutChart(openDataList01); 


         // Query 01 호출
        const result01 = await fetch("/openDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 1, '"+ occuDate +"', '"+ occuDate +"', ''",
                "port" : 12000,
                // "query": "SELECT * FROM TB_TEMP_RESULT",
                "id":"",
                "pw":""
            })
        });

        if (!result01.ok) {
            throw new Error('Network response was not ok');
        }

        const openDataList1 = await result01.json();
        // console.log("openDataList1", openDataList1);
        // console.log("result01", result01);



        // Query 01 받기
        const result01_1 = await fetch("/openDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[1],
                // "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 1, '"+ occuDate +"', '"+ occuDate +"', ''",
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result01_1.ok) {
            throw new Error('Network response was not ok');
        }

        const openDataList01_1 = await result01_1.json();
        // console.log("openDataList01_1", openDataList01_1);
        // console.log("result01_1", result01_1);
        
        // console.log("openDataList01.result[0]", openDataList01.result[0]);
        // console.log("openDataList01_1.result[0]", openDataList01_1.result[0]);


        // 두 배열을 합침
        const openDataListSum = combineData(openDataList01.result[0], openDataList01_1.result[0]);
        // console.log("openDataListSum", openDataListSum); 
        openDounutChart(openDataListSum); 
        




        // Query 2 호출
        const result2 = await fetch("/closeDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[0],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 2, '"+ occuDate +"', '"+ occuDate +"', ''",
                "port" : 12000,
                // "query": "SELECT * FROM TB_TEMP_RESULT",
                "id":"",
                "pw":""
            })
        });

        if (!result2.ok) {
            throw new Error('Network response was not ok');
        }

        const closeDataList = await result2.json();
        // console.log("closeDataList", closeDataList);
        // console.log("result2", result2);


        // Query 2 받기
        const result2_1 = await fetch("/closeDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[0],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result2_1.ok) {
            throw new Error('Network response was not ok');
        }

        const closeDataList01 = await result2_1.json();
        // console.log("closeDataList01", closeDataList01);
        // console.log("result2_1", result2_1);



        // Query 02 호출
        const result02 = await fetch("/closeDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 2, '"+ occuDate +"', '"+ occuDate +"', ''",
                "port" : 12000,
                // "query": "SELECT * FROM TB_TEMP_RESULT",
                "id":"",
                "pw":""
            })
        });

        if (!result02.ok) {
            throw new Error('Network response was not ok');
        }

        const closeDataList02 = await result02.json();
        // console.log("closeDataList", closeDataList);
        // console.log("result2", result2);


        // Query 02 받기
        const result02_1 = await fetch("/closeDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[1],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result02_1.ok) {
            throw new Error('Network response was not ok');
        }

        const closeDataList02_1 = await result02_1.json();
        // console.log("closeDataList01", closeDataList01);
        // console.log("result2_1", result2_1);
        

        // 두 배열을 합침
        const closeDataListSum = combineData(closeDataList01.result[0], closeDataList02_1.result[0]);
        // console.log("closeDataListSum", closeDataListSum); // ['10', '0', '0', '0', '0', '0']
        closeDounutChart(closeDataListSum); 



        // Query 3 호출
        const result3 = await fetch("/tableDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[0],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 3, '', '', ''",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result3.ok) {
            throw new Error('Network response was not ok');
        }

        const tableDataList = await result3.json();
        // console.log("tableDataList", tableDataList);
        // console.log("result3", result3);



        // Query 3 받기
        const result3_1 = await fetch("/tableDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[0],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result3_1.ok) {
            throw new Error('Network response was not ok');
        }

        const tableDataList01 = await result3_1.json();
        // console.log("tableDataList01", tableDataList01);
        // console.log("result3_1", result3_1);





        // Query 03 호출
        const result03 = await fetch("/tableDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 3, '', '', ''",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result03.ok) {
            throw new Error('Network response was not ok');
        }

        const tableDataList03 = await result03.json();
        // console.log("tableDataList03", tableDataList03);
        // console.log("result3", result3);



        // Query 03 받기
        const result03_1 = await fetch("/tableDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result03_1.ok) {
            throw new Error('Network response was not ok');
        }

        const tableDataList03_1 = await result03_1.json();
        // console.log("tableDataList03_1", tableDataList03_1);
        // console.log("result03_1", result03_1);

        // 두 배열을 병합
        const tableDataLisSum = mergeData(tableDataList01.result, tableDataList03_1.result);
        // console.log("tableDataLisSum", tableDataLisSum); 

        makeTable(tableDataLisSum); 






        // Query 5 호출
        const result5 = await fetch("/liveDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[0],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 5, '', '', ''",
                "port" : 12000,
                // "query": "SELECT * FROM TB_TEMP_RESULT",
                "id":"",
                "pw":""
            })
        });

        if (!result5.ok) {
            throw new Error('Network response was not ok');
        }

        const liveDataList = await result5.json();
        // console.log("liveDataList", liveDataList);
        // console.log("result5", result5);




        // Query 5 받기
        const result5_1 = await fetch("/liveDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[0],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result5.ok) {
            throw new Error('Network response was not ok');
        }

        const liveDataList01 = await result5_1.json();
        // console.log("liveDataList01", liveDataList01);
        // console.log("result5_1", result5_1);




        // Query 05 호출
        const result05 = await fetch("/liveDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 5, '', '', ''",
                "port" : 12000,
                // "query": "SELECT * FROM TB_TEMP_RESULT",
                "id":"",
                "pw":""
            })
        });

        if (!result05.ok) {
            throw new Error('Network response was not ok');
        }

        const liveDataList05 = await result05.json();
        // console.log("liveDataList05", liveDataList05);
        // console.log("result05", result05);




        // Query 05 받기
        const result05_1 = await fetch("/liveDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result05_1.ok) {
            throw new Error('Network response was not ok');
        }

        const liveDataList05_1 = await result05_1.json();
        // console.log("liveDataList05_1", liveDataList05_1);
        // console.log("result05_1", result05_1);
        
        // console.log("liveDataList05_1.result[0]", liveDataList05_1.result[0]);

        

        // 두 배열을 합침
        const liveDataListSum = combineData(liveDataList01.result[0], liveDataList05_1.result[0]);
        // console.log("liveDataListSum", liveDataListSum); 
        liveInformation(liveDataListSum); 





        // Query 0 호출
        const result0 = await fetch("/cameraNameList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 0, '', '', ''",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result0.ok) {
            throw new Error('Network response was not ok');
        }

        const cameraNameList = await result0.json();
        // console.log("cameraNameList", cameraNameList);
        // console.log("result0", result0);
        


        
        
        
        // Query 0 받기
        const result0_1 = await fetch("/cameraNameList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result0_1.ok) {
            throw new Error('Network response was not ok');
        }

        const cameraNameList01 = await result0_1.json();
        // console.log("cameraNameList01", cameraNameList01);
        // console.log("result0_1", result0_1);




        var cameraList = [];

        // console.log("cameraNameList01.result.length", cameraNameList01.result.length);

        for(let i = 0; i < cameraNameList01.result.length; i++){
            // console.log("cameraNameList01.result[i]", cameraNameList01.result[i]);
            cameraList.push(cameraNameList01.result[i][1]);
            // console.log("cameraList1", cameraList);
        }
        // console.log("cameraList2", cameraList);
        
        // 중복을 제거한 후에 중복 제거된 값들의 배열을 만듭니다.
        const cameras = [...new Set(cameraList)];
        // console.log("cameras", cameras);



        // Query 00 호출
        const result00 = await fetch("/cameraNameList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 0, '', '', ''",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result00.ok) {
            throw new Error('Network response was not ok');
        }

        const cameraNameList00 = await result00.json();
        // console.log("cameraNameList00", cameraNameList00);
        // console.log("result00", result00);
        


        
        
        
        // Query 00 받기
        const result00_1 = await fetch("/cameraNameList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result00_1.ok) {
            throw new Error('Network response was not ok');
        }

        const cameraNameList00_1 = await result00_1.json();
        // console.log("cameraNameList00_1", cameraNameList00_1);
        // console.log("result00_1", result00_1);




        var cameraList00 = [];

        // console.log("cameraNameList01.result.length", cameraNameList01.result.length);

        for(let i = 0; i < cameraNameList00_1.result.length; i++){
            // console.log("cameraNameList01.result[i]", cameraNameList01.result[i]);
            cameraList00.push(cameraNameList00_1.result[i][1]);
            // console.log("cameraList1", cameraList);
        }
        // console.log("cameraList2", cameraList);
        
        // 중복을 제거한 후에 중복 제거된 값들의 배열을 만듭니다.
        const cameras00 = [...new Set(cameraList00)];
        // console.log("cameras00", cameras00);





        // Query 4 호출
        const result4 = await fetch("/lineDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[0],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 4, '"+ occuDate +"', '"+ occuDate +"', '"+cameras+"'",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result4.ok) {
            throw new Error('Network response was not ok');
        }

        const lineDataList = await result4.json();
        // console.log("lineDataList", lineDataList);
        // console.log("result4", result4);





        // Query 4 받기
        const result4_1 = await fetch("/lineDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[0],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result4_1.ok) {
            throw new Error('Network response was not ok');
        }

        const lineDataList01 = await result4_1.json();
        // console.log("lineDataList01", lineDataList01);
        // console.log("result4_1", result4_1);






        // Query 04 호출
        const result04 = await fetch("/lineDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": takeIPList[1],
                "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 4, '"+ occuDate +"', '"+ occuDate +"', '"+cameras00+"'",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result04.ok) {
            throw new Error('Network response was not ok');
        }

        const lineDataList04 = await result04.json();
        // console.log("lineDataList04", lineDataList04);
        // console.log("result04", result04);





        // Query 04 받기
        const result04_1 = await fetch("/lineDataList01", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": takeIPList[1],
                "query": "SELECT * FROM TB_TEMP_RESULT",
                "port" : 12000,
                "id":"",
                "pw":""
            })
        });

        if (!result04_1.ok) {
            throw new Error('Network response was not ok');
        }

        const lineDataList04_1 = await result04_1.json();
        // console.log("lineDataList04_1", lineDataList04_1);
        // console.log("result4_1", result4_1);


        const camerasSum = addData(cameras, cameras00);
        // console.log("camerasSum", camerasSum); 
        // 두 배열을 병합
        const lineDataListSum = mergeData(lineDataList01.result, lineDataList04_1.result);
        // console.log("lineDataListSum", lineDataListSum); 

        lineChart(camerasSum, lineDataListSum); 

    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }


}


function combineData(list1, list2) {
    // console.log("list1", list1);
    // console.log("list2", list2);
    // console.log("1번 확인");
    if (list1.length !== list2.length) {
        throw new Error('두 배열의 길이가 다릅니다.');
    }

    return list1.map((value, index) => {
        // console.log("value", value);
        const num1 = parseFloat(value) || 0;  // value를 숫자로 변환, 변환이 안되면 0으로 설정
        const num2 = parseFloat(list2[index]) || 0;  // list2[index]를 숫자로 변환, 변환이 안되면 0으로 설정
        return String(num1 + num2);  // 더한 결과를 문자열로 변환하여 반환
    });
}


function mergeData(list1, list2) {
    return list1.concat(list2);
}



function addData(list1, list2) {
    // console.log("list1", list1);
    // console.log("list2", list2);
    return newArray = list1.concat(list2);
}


/* 날짜 형식화 함수 */
/* YYYYMMDD 형식으로 변환하는 함수 */
/* YYYY-MM-DD 형식으로 변환하는 함수 */
function formatToYYYYMMDD(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    // return year + month + day;
    return year+ "-" + month + "-" + day;
}