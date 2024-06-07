let gateTotalCount = document.getElementById("gateTotalCount");
let gateOpenCount = document.getElementById("gateOpenCount");
let gateCloseCount = document.getElementById("gateCloseCount");
let noSignalGateCount = document.getElementById("noSignalGateCount");

let totalSignalCount = document.getElementById("totalSignalCount");
let openSignalCount = document.getElementById("openSignalCount");
let noSignalCount = document.getElementById("noSignalCount");

let gateLiveList_arry;
let cameraCount;
let cameraIpList_arry;


function liveInformation(liveDataList01){
// function liveInformation(cameraCountResp, cameraIpListResp){

    let gateLive = liveDataList01.result[0];
    // console.log("gateLive", gateLive);
    
    
    let gateTotal = parseInt(gateLive[0]) + parseInt(gateLive[1]) + parseInt(gateLive[2]);
    // console.log("gateTotal", gateTotal);

    gateTotalCount.innerHTML = `${gateTotal} 개소`;
    gateOpenCount.innerHTML = `${gateLive[1]} 개소`;
    gateCloseCount.innerHTML = `${gateLive[0]} 개소`;
    noSignalGateCount.innerHTML = `${gateLive[2]} 개소`;



    // 카메라 정보
    // totalSignalCount.innerHTML = `${cameraCount} 개소`;


    // let okCount = 0;
    // let noCount = 0;

    // // IP 주소 확인 비동기 처리
    // cameraIpList_arry.forEach((item) => {
    //     let ipAddr = item;
    //     checkPing(ipAddr, (status) => {
    //         if (status === 200) {
    //             okCount++;
    //         } else {
    //             noCount++;
    //         }
    //         // // console.log("okCount", okCount);
    //         // // console.log("noCount", noCount);
    //         // // console.log("okCount + noCount", okCount + noCount);

    //         // 모든 IP 주소 확인 완료 후 카운트 표시
    //         if (okCount + noCount == cameraCount) {
    //             openSignalCount.innerHTML = `${okCount} CH`;
    //             noSignalCount.innerHTML = `${noCount} CH`;
    //         }
    //     });
    // });
}

function checkPing(ipAddr, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", ipAddr, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.status);
        }
    };
    xhr.send();
}