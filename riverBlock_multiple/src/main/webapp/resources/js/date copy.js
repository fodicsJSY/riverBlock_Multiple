


/* 전역변수 시작 */
var forDate;
/* 전역변수 끝 */

/* 오늘 날짜로 초기화 시작*/
// 페이지 로드 시 오늘 날짜로 초기화
document.addEventListener("DOMContentLoaded", ()=> {

    // inputDate 엘리먼트 초기화
    var inputDate = document.getElementById('inputDate');
    savedIP = getIPFromLocalStorage();
    // forDate 변수 초기화
    forDate = new Date(inputDate.value);

    // inputDate 엘리먼트 값 변경 이벤트 핸들러 등록
    inputDate.addEventListener('change', function() {
        sendToServer(savedIP, this.value);
    });

    // 초기화 함수 호출
    today();


    // 날짜 보내기 
    sendToServer(savedIP, forDate);

});


/* 오늘 날짜로 초기화 끝*/
    
    document.getElementById('calenderButton').addEventListener('change', function() {
        inputDate.value = this.value;
        sendToServer(savedIP, this.value);
    });


    document.getElementById('leftBtn').addEventListener("click", ()=>{
        // console.log("leftBtn클릭");
        beforeOneDay();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('rightBtn').addEventListener("click", ()=>{
        // console.log("rightBtn클릭");
        afterOneDay();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('yesterdayBtn').addEventListener("click", ()=>{
        // console.log("yesterdayBtn클릭");
        yesterday();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('todayBtn').addEventListener("click", ()=>{
        // console.log("todayBtn클릭");
        today();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('beforeWeekBtn').addEventListener("click", ()=>{
        // console.log("beforeWeekBtn클릭");
        before1weekBtn();
        sendToServer(savedIP, forDate);
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
    var today = new Date();
    var formattedDate = today.toISOString().substring(0, 10);
    inputDate.value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("오늘날짜 : ", forDate);
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
});



let data;

/* 날짜 보내기 */
async function sendToServer(savedIP, value) {
    // 형식을 YYYYMMDD로 변경
    let occuDate = formatToYYYYMMDD(value || forDate);
    console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력
    console.log('sendToServer savedIP:', savedIP); // 콘솔에 savedIP 값 로그 출력

    

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
            await fetchData2(savedIP, occuDate);
            // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
        } catch (error) {
            console.error('Error occurred:', error);
        }
    })();

    









    // //개문횟수
    // fetch("/openGateList", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "DECLARE @fr_time_0 NVARCHAR(8) = '00:00:00', @to_time_0 NVARCHAR(8) = '10:59:99', @fr_time_1 NVARCHAR(8) = '11:00:00' , @to_time_1 NVARCHAR(8) = '12:59:99', @fr_time_2 NVARCHAR(8) = '13:00:00', @to_time_2 NVARCHAR(8) = '16:59:99', @fr_time_3	NVARCHAR(8) = '17:00:00', @to_time_3 NVARCHAR(8) = '19:59:99', @fr_time_4 NVARCHAR(8) = '20:00:00', @to_time_4 NVARCHAR(8) = '21:59:99', @fr_time_5	NVARCHAR(8) = '21:00:00', @to_time_5 NVARCHAR(8) = '23:59:99' SELECT SUM(DATA.time_0) AS open_time_cnt_0, SUM(DATA.time_1) AS open_time_cnt_1, SUM(DATA.time_2) AS open_time_cnt_2, SUM(DATA.time_3) AS open_time_cnt_3, SUM(DATA.time_4) AS open_time_cnt_4, SUM(DATA.time_5) AS open_time_cnt_5 FROM (SELECT CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_0 AND @to_time_0 THEN 1 ELSE 0 END AS time_0, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_1 AND @to_time_1 THEN 1 ELSE 0 END AS time_1, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_2 AND @to_time_2 THEN 1 ELSE 0 END AS time_2, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_3 AND @to_time_3 THEN 1 ELSE 0 END AS time_3, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_4 AND @to_time_4 THEN 1 ELSE 0 END AS time_4, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_5 AND @to_time_5 THEN 1 ELSE 0 END AS time_5FROM dbo.TB_CIRCUIT_BREAKER_LOG WHERE log_date = "+occuDate+" AND gate_cmd = 1 ) DATA"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("openGateList", result );
    
    //     data = result;
    
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성



    // //폐문횟수
    // fetch("/closeGateList", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "DECLARE @fr_time_0 NVARCHAR(8) = '00:00:00', @to_time_0 NVARCHAR(8) = '10:59:99', @fr_time_1 NVARCHAR(8) = '11:00:00' , @to_time_1 NVARCHAR(8) = '12:59:99' , @fr_time_2 NVARCHAR(8) = '13:00:00' , @to_time_2 NVARCHAR(8) = '16:59:99' , @fr_time_3 NVARCHAR(8) = '17:00:00' , @to_time_3 NVARCHAR(8) = '19:59:99' , @fr_time_4 NVARCHAR(8) = '20:00:00' , @to_time_4 NVARCHAR(8) = '21:59:99' , @fr_time_5 NVARCHAR(8) = '21:00:00', @to_time_5 NVARCHAR(8) = '23:59:99' SELECT SUM(DATA.time_0) AS close_time_cnt_0, SUM(DATA.time_1) AS close_time_cnt_1, SUM(DATA.time_2) AS close_time_cnt_2, SUM(DATA.time_3) AS close_time_cnt_3, SUM(DATA.time_4) AS close_time_cnt_4 , SUM(DATA.time_5) AS close_time_cnt_5 FROM(SELECTCASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_0 AND @to_time_0 THEN 1ELSE 0 END AS time_0, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_1 AND @to_time_1 THEN 1 ELSE 0 END AS time_1, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_2 AND @to_time_2 THEN 1 ELSE 0 END AS time_2, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_3 AND @to_time_3 THEN 1 ELSE 0 END AS time_3, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_4 AND @to_time_4 THEN 1 ELSE 0 END AS time_4, CASE WHEN CONVERT(NVARCHAR, log_time, 8) BETWEEN @fr_time_5 AND @to_time_5 THEN 1 ELSE 0 END AS time_5 FROM dbo.TB_CIRCUIT_BREAKER_LOG WHERE log_date = "+occuDate+" AND gate_cmd = 0) DATA"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("closeGateList", result );
    
    //     data = result;
    
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성



    // //라인차트
    // fetch("/sendLineQuery", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "DECLARE @tb_temp_camera TABLE (camera_name NVARCHAR(50), cnt INT)INSERT INTO @tb_temp_camera SELECT TOP 10 camera_name , COUNT(camera_name) AS cnt FROM TB_CIRCUIT_BREAKER_LOG WHERE CONVERT(VARCHAR(7), log_date, 120) = LEFT("+occuDate+"}, 7) GROUP BY camera_name ORDER BY cnt DESC SELECT GLOG.log_date, GLOG.camera_name, COUNT(GLOG.log_date) AS cnt FROM TB_CIRCUIT_BREAKER_LOG GLOG WHERE CONVERT(VARCHAR(7), GLOG.log_date, 120) = LEFT("+occuDate+"}, 7) AND GLOG.camera_name IN (SELECT camera_name FROM @tb_temp_camera) GROUP BY GLOG.log_date, GLOG.camera_name ORDER BY GLOG.log_date, GLOG.camera_name"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("lineResult", result );
    
    //     data = result;
    
    //     // 차트호출
    //     lineChart(data);
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성




    // 테이블
    // fetch("/sendTableQuery", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "SELECT camera_name AS gate_name, CASE WHEN status = 1 THEN 'open' WHEN status = 0 THEN 'close' ELSE'' END AS gate_status , CASE WHEN status = 1 OR status = 0 THEN 'on' ELSE'off'END AS comm_status FROM TB_CIRCUIT_BREAKER_CONFIG"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("tableResult", result );
    
    //     tableResult = result;
    
    //     // 함수호출
    //     // makeTable(tableResult);
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성








    // //카메라 개수 (왼쪽)
    // fetch("/cameraCount", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "SELECT COUNT(ip_addr) AS camera_total_cnt FROM TB_CAMERA"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("cameraCount", result );
    
    //     cameraCount = result;
    
    //     // 함수호출
    //     liveInfomation(cameraCount);
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성




    // // 카메라 ip(왼쪽)
    // fetch("/cameraIpList", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "SELECT ip_addr FROM TB_CAMERA"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("cameraIpList", result );
    
    //     cameraIpList = result;
    
    //     // 함수호출
    //     liveInfomation(cameraIpList);
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성







    // //게이트 현황(왼쪽)
    // fetch("/gateLiveList", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("gateLiveList", result );
    
    //     gateLiveList = result;
    
    //     // 함수호출
    //     liveInfomation(gateLiveList);
    
    
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성








    /************************ 외부 DB연결 select**************************/
    
    // select
    // let totalUrl = "http://172.16.103.34:8988/fnvr/request/query/select"
    
    
    // fetch("/getDataFromAPI", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     credentials: "include",
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "SELECT SRV.site_code, CAM.camera_code, CAM.camera_name, CASE WHEN GIS_CAM.GIS_COORDINATE_X > 0 AND GIS_CAM.GIS_COORDINATE_Y > 0 THEN 1 ELSE 0 END AS gis_alloc, GIS_CAM.GIS_COORDINATE_X, GIS_CAM.GIS_COORDINATE_Y FROM TB_CAMERA CAM LEFT OUTER JOIN TB_SERVER_RECORD SRV ON type = 34 LEFT OUTER JOIN TB_GATE_CONTROL_GIS_CAMERA_INFO GIS_CAM ON SRV.site_code = GIS_CAM.SITE_CODE AND CAM.camera_code = GIS_CAM.CAMERA_CODE"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("result", result );

    //     // data = result;
    //     // console.log("data : ", data);
        
        
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성

    /************************ 외부 DB연결 select**************************/


    /************************ 외부 DB연결 execute**************************/

    
    // insert, update
    // let totalUrl = "http://127.0.0.1:8988/fnvr/request/query/execute"
    
    // fetch("/getDataFromAPI", { 
    //     method : "POST", 
    //     headers: {"Content-Type": "application/json;"}, 
    //     credentials: "include",
    //     body : JSON.stringify( {
    //                             "serverip" : "172.16.0.93",
    //                             "query": "UPDATE TB_GATE_CONTROL_GIS_FVRT_INFO SET HOME_FLAG = CASE WHEN FVRT_CODE = 'FVRT_CODE' THEN 1 ELSE 0 END WHERE 1 = 1"
    //                             } ) 
    // })
    // .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    // .then((result) => {
    //     console.log("result", result );

    //     // data = result;
    //     // console.log("data : ", data);
        
        
    // }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    // .catch( err => {
    //     // console.log("err : ", err);
    // }); // 예외 발생 시 처리할 내용을 작성

    /************************ 외부 DB연결 execute**************************/



}




/* 날짜 형식화 함수 */
/* YYYYMMDD 형식으로 변환하는 함수 */
/* YYYY-MM-DD 형식으로 변환하는 함수 */
function formatToYYYYMMDD(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
}

async function fetchData2(savedIP, occuDate){
    // var DBip = "172.16.0.93";

    console.log('fetchData2 occuDate:', occuDate); // 콘솔에 occuDate 값 로그 출력
    console.log('fetchData2 savedIP:', savedIP); // 콘솔에 savedIP 값 로그 출력
    


    try {
        const cameraCountResp = await fetch("/cameraCount", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
                "query": "SELECT COUNT(ip_addr) AS camera_total_cnt FROM TB_CAMERA",
                "id":"",
                "pw":""
            })
        }).then(resp => resp.json());

        const cameraIpListResp = await fetch("/cameraIpList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
                "query": "SELECT ip_addr FROM TB_CAMERA",
                "id":"",
                "pw":""
            })
        }).then(resp => resp.json());

        //쿼리 수정해야 함.
        const gateLiveListResp = await fetch("/gateLiveList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
                "query": "SELECT SUM(DATA.gate_total) AS gate_total_cnt, SUM(DATA.gate_open) AS gate_open_cnt, SUM(DATA.gate_close) AS gate_close_cnt, SUM(DATA.gate_disable) AS gate_disable_cnt FROM (SELECT 1 AS gate_total, CASE WHEN status = 1 THEN 1 ELSE 0 END AS gate_open	, CASE WHEN status = 0 THEN 1 ELSE 0 END AS gate_close, CASE WHEN status = 0 THEN 0 WHEN  status = 1 THEN 0 ELSE 1 END AS gate_disable FROM TB_CIRCUIT_BREAKER_CONFIG) DATA",
                "id":"",
                "pw":""
            })
        }).then(resp => resp.json());
        
        console.log("cameraCountResp", cameraCountResp);
        // console.log("cameraIpListResp", cameraIpListResp);
        // console.log("gateLiveListResp", gateLiveListResp);
        
        // fetchData 함수를 호출하고 결과를 처리하는 예제
        (async () => {
            try {
                await fetchData(savedIP, occuDate);
                // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
                
                // 각각의 응답 데이터를 이용하여 원하는 작업 수행
            } catch (error) {
                console.error('Error occurred:', error);
            }
        })();
        
        liveInformation(cameraCountResp, cameraIpListResp, gateLiveListResp);

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}



async function fetchData(savedIP, occuDate) {
    console.log("여기!");

    // var DBip = "172.16.0.93";
    console.log('fetchData occuDate:', occuDate); // 콘솔에 occuDate 값 로그 출력
    console.log('fetchData savedIP:', savedIP); // 콘솔에 savedIP 값 로그 출력
    
    

    try {
        console.log("호출!");
        // 테이블 호출
        const result1 = await fetch("/sendTableQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
                "query": "SELECT camera_name AS gate_name, CASE WHEN status = 1 THEN 'open' WHEN status = 0 THEN 'close' ELSE'' END AS gate_status , CASE WHEN status = 1 OR status = 0 THEN 'on' ELSE'off'END AS comm_status FROM TB_CIRCUIT_BREAKER_CONFIG",
                "id":"",
                "pw":""
            })
        });

        if (!result1.ok) {
            throw new Error('Network response was not ok');
        }

        const sendTableQuery = await result1.json();
        console.log("sendTableQuery", sendTableQuery);
        console.log("result1", result1);

        makeTable(sendTableQuery); 


        // 개문횟수
        const result2 = await fetch("/openGateList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": savedIP,
                "query": "",

            })
        });

        if (!result2.ok) {
            throw new Error('Network response was not ok');
        }

        const openGateList = await result2.json();
        console.log("Some other endpoint", result2);




        // 폐문횟수
        const result3 = await fetch("/closeGateList", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,
                "serverip": savedIP,
                "query": "",
            })
        });

        if (!result3.ok) {
            throw new Error('Network response was not ok');
        }

        const closeGateList = await result3.json();
        console.log("Some other endpoint", result3);





        // 라인차트
        const result4 = await fetch("/sendLineQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "occuDate": occuDate,    
                "serverip": savedIP,
                "query": "",
            })
        });

        if (!result4.ok) {
            throw new Error('Network response was not ok');
        }

        const sendLineQuery = await result4.json();
        console.log("Some other endpoint", result4);

       


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

