var settingButton = document.getElementById("settingButton");

settingButton.addEventListener("click", ()=>{
    console.log("클릭");

    getDBIP();

});



// ip 2개 받아서 로그인하는 것으로 수정해야 함

// IP명 받기
async function getDBIP() {
    const { value: formValues } = await Swal.fire({
        title: "IP를 입력해주세요.",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="IP1">
            <input id="swal-input2" class="swal2-input" placeholder="IP2">
        `,
        focusConfirm: true,
        preConfirm: () => {
            const inputIP1 = document.getElementById('swal-input1').value;
            const inputIP2 = document.getElementById('swal-input2').value;

            if (!inputIP1 || !inputIP2) {
                Swal.showValidationMessage('IP 2개 모두 입력해주세요.');
                return;
            }

            return { inputIP1, inputIP2 };
        },
        showCancelButton: true,
    });

        makeipList(formValues);

    // console.log("ipAddr: ", ipAddr);
    return formValues;
}


let ipList = [];


// function addipList(formValues){
//     console.log("formValues", formValues);
//     let saveList = localStorage.getItem('ipList')
//     console.log("saveList", saveList);
    
//     if (!saveList.includes(formValues)) {
//         // console.log("ipAddr", ipAddr);
//         // console.log("saveList", saveList);
//         // ipList.push(saveList);
//         ipList.push(formValues);
//         // console.log("ipList", ipList);
//     }

//     localStorage.setItem('ipList', ipList);

//     // console.log("ipList", ipList);
//     // initialize(ipList);
// }


function makeipList(formValues){
    console.log("make");
    // console.log("ipList", ipList);
    // 사용자가 새로운 IP를 입력했을 경우에만 저장
    console.log("formValues", formValues);
    console.log("formValues.inputIP1", formValues.inputIP1);
    console.log("formValues.inputIP2", formValues.inputIP2);
    

    
    // IP 주소 값을 리스트에 담기
    ipList = [formValues.inputIP1, formValues.inputIP2];
    console.log("ipList", ipList);

    // localStorage.setItem('ipList', ipList);
    localStorage.setItem('ipList', JSON.stringify(ipList));

    // console.log("ipList", ipList);
    // initialize(ipList);
}

// 로컬 스토리지에서 IP 주소를 가져오는 함수
function getIPFromLocalStorage() {
    return localStorage.getItem("dbIP");
}



// inputDate 엘리먼트 초기화
var inputDate = document.getElementById('inputDate');
let savedIP;
let savedIPList;

// 초기화할 때 로컬 스토리지에서 IP를 가져와 사용
// async function initialize() {
//     savedIP = localStorage.getItem("dbIP");
//     // if (savedIP) {
//     //     await ipFetch(savedIP);
//     // }
//     console.log("initialize savedIP", savedIP);


//     // forDate 변수 초기화
//     forDate = new Date(inputDate.value);
//     today();
//     // inputDate 엘리먼트 값 변경 이벤트 핸들러 등록
//     inputDate.addEventListener('change', function() {
//         sendToServer(savedIP, this.value);
//     });

//     // 날짜 보내기 
//     console.log("날짜보내기");

//     (async () => {
//         try {
//             sendToServer(savedIP, forDate);
//             // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
//         } catch (error) {
//             console.error('Error occurred:', error);
//         }
//     })();
// }


// 사용자가 입력한 IP 주소를 로컬 스토리지에 저장하는 함수
function saveIPToLocalStorage(ipAddr) {
    localStorage.setItem("dbIP", ipAddr);
}


