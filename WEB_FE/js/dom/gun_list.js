/**
 * @file dom/gun_list.js
 * @author Sinduy
 * @brief for #gun_list_table in gun_list.html
 * @requires defines.js | datatypes.js | dom/edit_status.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { gun_list_table } from './defines.js';
// import { edit_status } from './edit_status.js';

/**
 * @brief set thead of gun_list_table
 */
function set_gun_list_table_thead() {
    const thead = gun_list_table.querySelector("thead");
    thead.innerHTML = `
        <tr>
            <th class="num"></th>
            <th class="name">${GunStatus_ParamNames.name}</th>
            <th class="division">${GunStatus_ParamNames.division}</th>
            <th class="lank">${GunStatus_ParamNames.lank}</th>
            <th class="gun_model">${GunStatus_ParamNames.gun_model}</th>
            <th class="gun_serial">${GunStatus_ParamNames.gun_serial}</th>
            <th class="status">${GunStatus_ParamNames.status}</th>
            <th class="note">${GunStatus_ParamNames.note}</th>
        </tr>`;
}

/**
 * @brief GunStatus data to HTML
 * @param {HTMLTableRowElement} row Element to set
 * @param {GunStatus} data GunStatus data
 */
function set_row_GunStatus(row, data) {
    row.innerHTML = `
    <td class="num">${data.num}</td>
    <td class="name">${data.name}</td>
    <td class="division">${data.division}</td>
    <td class="lank">${Lank_table[data.lank]}</td>
    <td class="gun_model">${data.gun_model}</td>
    <td class="gun_serial">${data.gun_serial}</td>
    <td class="status">${data.status == Status.현보유 ? "" : Status_table[data.status]}</td>
    <td class="note">${data.note}</td>
    `;
    row.addEventListener('click', function (e) {
        edit_status(data);
    });
}



/**
 * @brief set tbody of gun_list_table
 * @param {GunStatus[]} datalist GunStatus data list
*/
function set_gun_list_table_tbody(datalist) {
    const tbody = gun_list_table.querySelector("tbody")
    tbody.innerHTML = "";
    for(let i = 0; i < CABINET_SIZE; i++) {
        let gunStatus = datalist.find(data => data.num == i+1);
        if(gunStatus != undefined) {
            let row = tbody.insertRow();
            set_row_GunStatus(row, gunStatus);
        }else{
            let row = tbody.insertRow();
            let param_table = Object.keys(GunStatus_ParamNames);
            row.innerHTML += `<td class="${param_table[0]} empty">${i+1}</td>`;
            for(let j = 1; j < param_table.length; j++) {
                row.innerHTML += `<td class="${param_table[j]} empty"></td>`;
            }
        }
    }
}

/**
 * @brief update tbody of gun_list_table
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