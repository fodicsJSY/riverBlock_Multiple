// 페이지 새로고침 타이머를 위한 전역 변수
let refreshTimer;

/* 1분 간격으로 페이지 리프레시 시작 */
function refreshEveryMinute() {
    // 현재 시간 정보 가져오기
    var now = new Date();
    
    // 다음 정각 시간 설정
    var nextMinute = new Date(now);
    nextMinute.setMinutes(now.getMinutes() + 1);
    nextMinute.setSeconds(0);
    nextMinute.setMilliseconds(0);
    
    // 다음 정각까지의 시간 계산
    var millisTillNextMinute = nextMinute - now;
    
    // 다음 정각이 이미 지났으면 다음 분으로 설정
    if (millisTillNextMinute < 0) {
        millisTillNextMinute += 60000; // 1분 = 60000 밀리초
    }
    
    // 타이머 설정하여 매 1분마다 새로 고침
    refreshTimer = setInterval(function () {
        // inputDate의 값 가져오기
        var inputDateValue = document.getElementById("inputDate").value;
        
        // 오늘 날짜 가져오기
        var today = new Date();
        var todayFormatted = today.getFullYear() + '-' + 
            ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
            ('0' + today.getDate()).slice(-2);
        
        // 오늘과 inputDate의 값이 같으면 새로 고침
        if (inputDateValue === todayFormatted) {
            location.reload(true); // true 파라미터는 캐시를 무시하고 새로고침
        }
    }, millisTillNextMinute);
}

// 1분 간격으로 페이지 리프레시 시작
refreshEveryMinute();
