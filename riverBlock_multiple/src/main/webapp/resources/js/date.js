


/* 전역변수 시작 */
var forDate;
/* 전역변수 끝 */

/* 오늘 날짜로 초기화 시작*/
// 페이지 로드 시 오늘 날짜로 초기화
document.addEventListener("DOMContentLoaded", ()=> {

    // inputDate 엘리먼트 초기화
    var inputDate = document.getElementById('inputDate');
    // 1개일 때
    savedIP = localStorage.getItem('dbIP');
    console.log("savedIP", savedIP);

    // iplist
    savedIPList = localStorage.getItem('ipList');
    console.log("savedIPList", savedIPList);

    // forDate 변수 초기화
    forDate = new Date(inputDate.value);

    // inputDate 엘리먼트 값 변경 이벤트 핸들러 등록
    inputDate.addEventListener('change', function() {
        sendToServer(savedIP, this.value);
        // sendToServer(savedIPList, this.value);
    });

    // 초기화 함수 호출
    today();


    // 날짜 보내기 
    // sendToServer(savedIP, forDate);
    sendToServer(savedIPList, forDate);

});


/* 오늘 날짜로 초기화 끝*/
    
    document.getElementById('calenderButton').addEventListener('change', function() {
        inputDate.value = this.value;
        sendToServer(savedIP, this.value);
        // sendToServer(savedIPList, this.value);
    });


    document.getElementById('leftBtn').addEventListener("click", ()=>{
        // console.log("leftBtn클릭");
        beforeOneDay();
        sendToServer(savedIP, forDate);
        // sendToServer(savedIPList, this.value);
    });


    document.getElementById('rightBtn').addEventListener("click", ()=>{
        // console.log("rightBtn클릭");
        afterOneDay();
        sendToServer(savedIP, forDate);
        // sendToServer(savedIPList, this.value);
    });


    document.getElementById('yesterdayBtn').addEventListener("click", ()=>{
        // console.log("yesterdayBtn클릭");
        yesterday();
        sendToServer(savedIP, forDate);
        // sendToServer(savedIPList, this.value);
    });


    document.getElementById('todayBtn').addEventListener("click", ()=>{
        // console.log("todayBtn클릭");
        today();
        sendToServer(savedIP, forDate);
        // sendToServer(savedIPList, this.value);
    });


    document.getElementById('beforeWeekBtn').addEventListener("click", ()=>{
        // console.log("beforeWeekBtn클릭");
        before1weekBtn();
        sendToServer(savedIP, forDate);
        // sendToServer(savedIPList, this.value);
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
    sendToServer(savedIP, this.value);
    // sendToServer(savedIPList, this.value);
});



let data;

/* 날짜 보내기 */
// async function sendToServer(savedIP, value) {
async function sendToServer(savedIPList, value) {
    // 형식을 YYYYMMDD로 변경
    let occuDate = formatToYYYYMMDD(value || forDate);
    // console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력
    // console.log('sendToServer savedIP:', savedIP); // 콘솔에 savedIP 값 로그 출력

    

    //이전 DB연결 시 작성한 ajax문*******************************************************
    
        // fetch("/sendDate", { 
        //     method : "POST", 
        //     headers: {"Content-Type": "application/json;"}, 
        //     body : JSON.stringify( {"occuDate":occuDate} ) 
        // })
        // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
        // .then((result) => {
        //         // console.log("result", result );
            
        //         data = result;
            
        //         // 차트호출
        //         lineChart(data);
        //         makeTable(data);
        //         liveInfomation(data);
        //         openDounutChart(data);
        //         closeDounutChart(data);
            
            
        //     }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
        //     .catch( err => {
        //             // console.log("err : ", err);
        //         }); // 예외 발생 시 처리할 내용을 작성
                
    //이전 DB연결 시 작성한 ajax문*******************************************************




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
    console.log("savedIPList", savedIPList);
    console.log("savedIPList[0]", savedIPList[0]);
    console.log("savedIPList[1]", savedIPList[1]);
    console.log("savedIPList[2]", savedIPList[2]);
    console.log("savedIPList[3]", savedIPList[3]);
    
    const takeIPList = savedIPList;
    console.log("takeIPList", takeIPList);
    console.log("takeIPList[0]", takeIPList[0]);
    console.log("takeIPList[1]", takeIPList[1]);
    console.log("takeIPList[2]", takeIPList[2]);
    console.log("takeIPList[3]", takeIPList[3]);
    
    
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
                "serverip": savedIP,
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
                "serverip": savedIP,
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


        openDounutChart(openDataList01); 
        

        // Query 2 호출
        const result2 = await fetch("/closeDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": savedIP,
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
                "serverip": savedIP,
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


        closeDounutChart(closeDataList01); 



        // Query 3 호출
        const result3 = await fetch("/tableDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
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
                "serverip": savedIP,
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

        makeTable(tableDataList01); 






        // Query 5 호출
        const result5 = await fetch("/liveDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
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
                "serverip": savedIP,
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

        liveInformation(liveDataList01); 





        // Query 0 호출
        const result0 = await fetch("/cameraNameList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
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
                "serverip": savedIP,
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





        // Query 4 호출
        const result4 = await fetch("/lineDataList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": savedIP,
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
                "serverip": savedIP,
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



        lineChart(cameras, lineDataList01); 







    // (async () => {
    //     try {
    //         await fetchData2(savedIP, occuDate, cameras);
    //         // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행

    //         // 각각의 응답 데이터를 이용하여 원하는 작업 수행
    //     } catch (error) {
    //         console.error('Error occurred:', error);
    //     }
    // })();





    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }
}



// var cameras;



// async function fetchData2(savedIP, occuDate, cameras) {

    
//     try {
//         const result0 = await fetch("/cameraNameList", {
//             method: "POST",
//             headers: { "Content-Type": "application/json;" },
//             body: JSON.stringify({
//                 "serverip": savedIP,
//                 "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 0, '', '', ''",
//                 "id":"",
//                 "pw":""
//             })
//         }).then(resp => resp.json());


//         const result0_1 = await fetch("/cameraNameList01", {
//             method: "POST",
//             headers: { "Content-Type": "application/json;" },
//             body: JSON.stringify({
//                 "serverip": savedIP,
//                 "query": "SELECT * FROM TB_TEMP_RESULT",
//                 "id":"",
//                 "pw":""
//             })
//         }).then(resp => resp.json());



//         const result4 = await fetch("/lineDataList", {
//             method: "POST",
//             headers: { "Content-Type": "application/json;" },
//             body: JSON.stringify({
//                 "occuDate": occuDate,
//                 "serverip": savedIP,
//                 "query": "EXEC SP_GET_GATE_CONTROL_DSASHBOARD_DATA 4, '"+ occuDate +"', '"+ occuDate +"', '"+cameras+"'",
//                 "id":"",
//                 "pw":""
//             })
//         }).then(resp => resp.json());

//         //쿼리 수정해야 함.
//         const result4_1 = await fetch("/lineDataList01", {
//             method: "POST",
//             headers: { "Content-Type": "application/json;" },
//             body: JSON.stringify({
//                 "serverip": savedIP,
//                 "query": "SELECT * FROM TB_TEMP_RESULT",
//                 "id":"",
//                 "pw":""
//             })
//         }).then(resp => resp.json());

//         console.log("cameraCountResp", cameraCountResp);
//         // console.log("cameraIpListResp", cameraIpListResp);
//         // console.log("gateLiveListResp", gateLiveListResp);

//         // fetchData 함수를 호출하고 결과를 처리하는 예제
//         (async () => {
//             try {
//                 await fetchData(savedIP, occuDate);
//                 // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행

//                 // 각각의 응답 데이터를 이용하여 원하는 작업 수행
//             } catch (error) {
//                 console.error('Error occurred:', error);
//             }
//         })();

//         liveInformation(cameraCountResp, cameraIpListResp, gateLiveListResp);

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }

// }










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