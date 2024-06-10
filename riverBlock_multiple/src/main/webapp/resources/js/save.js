document.getElementById("saveBtn").addEventListener("click", ()=>{
    console.log("클릭");
    getName();
});


// 파일명 받기
async function inputName() {
    const { value: fname } = await Swal.fire({
        title: "파일명을 입력해주세요.",
        input: "text",
        inputLabel: "파일명을 입력해주세요.",
        showCancelButton: true,
        inputValidator: (value) => {
            // console.log("value : ", value);
            if (!value) {
                return inputName();
            }
        }
    });
    // console.log("fname : ", fname);
    return fname;
}



// 비동기로 이름 받아오기
async function getName() {

    // 파일명 가져오기
    const fname = await inputName();

    if (fname) {
        fetch("fnameUrl", { 
            method : "POST", 
            headers: {"Content-Type": "application/json"}, 
            body : JSON.stringify( {"fname":fname} ) 
        })
        .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
        .then((result) => {
            // console.log("result : ", result);

            let filename = result.fname;

            saveData(filename);

        }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
        .catch( err => {
            // console.log("err : ", err);
            Swal.fire("파일을 다운로드 할 수 없습니다.");
        }); // 예외 발생 시 처리할 내용을 작성
    }
}



function saveData(filename) {
    exelFile(filename);
}



async function exelFile(filename){
    try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('sheet1');

    worksheet.getCell('A1').value = '엑셀 특정 셀에 값 넣기';

        // const rawData = [
        //     {header: "order_id", data: ['12345678', '12345679', '12345680']},
        //     {header: "store_id", data: ['storeA', 'storeB', 'storeC']},
        //     {header: "country_id", data: ['KR', 'KR', 'KR']},
        //     {header: "price", data: ['15000', '10000', '20000']}
        // ]

        // rawData.forEach((data, index) => {
        //     worksheet.getColumn(index + 1).values = [data.header, ...data.data];
        // });


        var blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], { type: blobType });
        saveAs(blob, `${filename}.xlsx`);
        Swal.fire(`${filename}가 다운로드 되었습니다.`);
        });

    } catch (error) {
        console.error("파일 다운로드 실패: ", error);
        Swal.fire(`${filename} 다운로드 실패`);
    }

}

