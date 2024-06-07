let tableDataList; 

function makeTable(sendTableQuery){
   // console.log("sendTableQuery", sendTableQuery );
    tableDataList = sendTableQuery.result;

    // console.log("tableDataList", tableDataList );
    // console.log("테이블 생성");

    var tableContainer = document.querySelector(".tableContainer");
    tableContainer.innerHTML = ""; // Clear previous data

    var div = document.createElement("div");
    tableContainer.appendChild(div);

    var gateTable = document.createElement("table");
    gateTable.className = "gateTable";
    div.appendChild(gateTable);

    var gateThead = document.createElement("thead");
    gateThead.className = "gateThead";
    gateTable.appendChild(gateThead);

    var htr = document.createElement("tr");
    gateThead.appendChild(htr);

    createCell(htr, "th", "gatetd gateName", "게이트명");
    // createCell(htr, "th", "gatetd", "위치");
    createCell(htr, "th", "gatetd gateYN", "개폐여부");
    createCell(htr, "th", "gatetd signal", "통신상태");


    var gateTbody = document.createElement("tbody");
    gateTbody.className = "gateTbody";
    gateTable.appendChild(gateTbody);

    var tr = document.createElement("tr");
    gateTbody.appendChild(tr);


    // 데이터 삽입
    tableDataList.forEach(function (item) {    
        // console.log("item[0]", item[0]);
        // console.log("item[1]", item[1]);
        // // console.log("item[2]", item[2]);


        var tr = document.createElement("tr");
        gateTbody.appendChild(tr);
        createCell(tr, "td", "gatetd", item[1]);

        var div1 = document.createElement("div");
        div1.className = "gateIconBox";
        tr.appendChild(div1);

        let gateImg =  document.createElement("img");
        gateImg.className = "gateIcon";

        
        // // console.log("item.gateStatus : ", item.gateStatus );
        

        if(item[2] == 'close'){
            gateImg.src = "/resources/img/iconBTN_GateClose.png";
        }
        if(item[2] == 'open'){
            gateImg.src = "/resources/img/iconBTN_GateOpen.png";
        }
        div1.appendChild(gateImg);
        
        if(item[2] == 'disconnected'){
            div1.innerHTML = "-";
        }

        
        let signalImg =  document.createElement("img");
        signalImg.className = "signalIcon";

        // // console.log("item.commStatus : ", item.commStatus );
        if(item[3] == 'on'){
            signalImg.src = "/resources/img/connect-signalOK.png";
        }
        if(item[3] == 'off'){
            signalImg.src = "/resources/img/connect-signalNO.png";
        }

        // createCell(tr, "td", "gatetd", data);
        createCell(tr, "td", "gatetd gate", div1);
        createCell(tr, "td", "gatetd", signalImg.outerHTML);
        
    });
}


// 셀 생성 함수
function createCell(row, elementType, className, content) {
    var cell = document.createElement(elementType);
    cell.className = className;
    
    // 이미지 엘리먼트인 경우에는 바로 추가
    if (typeof content === 'object' && content instanceof HTMLElement) {
        cell.appendChild(content);
    } else {
        cell.innerHTML = content;
    }

    row.appendChild(cell);
}

