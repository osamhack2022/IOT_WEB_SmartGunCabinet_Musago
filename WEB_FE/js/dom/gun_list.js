/**
 * @file dom/gun_list.js
 * @author Sinduy
 * @description for #gun_list_table in gun_list.html
 * @requires defines.js
 * @requires datatypes.js
 * @requires dom/edit_status.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { gun_list_table } from './defines.js';
// import { edit_status } from './edit_status.js';

/**
 * @description set thead of gun_list_table
 */
function set_gun_list_table_thead() {
    const thead = gun_list_table.querySelector("thead");
    thead.innerHTML = "";

    let row = thead.insertRow();
    GunStatus_Param_Array.forEach(param => {
        let cell = document.createElement("th");
        cell.className = param;
        cell.innerHTML = GunStatus_ParamNames[param];
        row.appendChild(cell);
    });
}

/**
 * @description GunStatus data to HTML
 * @param {HTMLTableRowElement} row Element to set
 * @param {GunStatus} data GunStatus data
 */
function set_row_GunStatus(row, data) {
    row.innerHTML = "";
    GunStatus_Param_Array.forEach(param => {
        let cell = row.insertCell();
        cell.className = param;
        cell.innerHTML = 
        param == "status" ? 
            data.status == Status.현보유 ? 
                "-" : 
                Status_table[data.status] :
        param == "lank" ?
            data.lank == Lank.없음 ?
                "-" :
                Lank_table[data.lank] :
        data[param];
        
    });
    row.addEventListener('click', function (e) {
        edit_status(data);
    });
}



/**
 * @description set tbody of gun_list_table
 * @param {GunStatus[]} datalist GunStatus data list
*/
function set_gun_list_table_tbody(datalist) {
    const tbody = gun_list_table.querySelector("tbody")
    tbody.innerHTML = "";
    for(let i = 0; i < CABINET_SIZE; i++) {
        const data = datalist.find(data => data.num == i+1);
        if(data != undefined) {
            let row = tbody.insertRow();
            set_row_GunStatus(row, data);
        }else{
            let row = tbody.insertRow();
            row.innerHTML += `<td class="${GunStatus_Param_Array[0]} empty">${i+1}</td>`;
            for(let j = 1; j < GunStatus_Param_Array.length; j++) {
                row.innerHTML += `<td class="${GunStatus_Param_Array[j]} empty"></td>`;
            }
        }
    }
}

/**
 * @description update tbody of gun_list_table
 * @param {GunStatus[]} datalist GunStatus data list
*/
function update_gun_list_table(datalist) {
    const tbody = gun_list_table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");
    datalist.forEach( data => {
        const row = rows[data.num-1];
        set_row_GunStatus(row, data);
    });
}