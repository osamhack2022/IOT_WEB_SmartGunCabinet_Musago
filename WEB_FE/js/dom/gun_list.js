/**
 * @file gun_list.js
 * @author Sinduy
 * @brief for #gun_list_table in gun_list.html
 * @requires defines.js | datatypes.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { Lank, Status } from './defines.js';

const gun_list_table = document.getElementById("gun_list_table");

/**
 * @brief set thead of gun_list_table
 */
function set_gun_list_table_thead() {
    const thead = gun_list_table.querySelector("thead");
    thead.innerHTML = `
        <tr>
            <th class="number"></th>
            <th class="name">${GunStatus_ParamNames.name}</th>
            <th class="division">${GunStatus_ParamNames.division}</th>
            <th class="lank">${GunStatus_ParamNames.lank}</th>
            <th class="gun_model">${GunStatus_ParamNames.gun_model}</th>
            <th class="gun_serial">${GunStatus_ParamNames.gun_serial}</th>
            <th class="status">${GunStatus_ParamNames.status}</th>
            <th class="note">${GunStatus_ParamNames.note}</th>
        </tr>`;
}

let gun_list_tableNumber = 0;
/**
 * @brief GunStatus data to HTML
 * @param {GunStatus} data GunStatus data
 * @returns {string} HTML string
 */
function gunStatusToHTML(data) {
    gun_list_tableNumber++;
    return `
        <td class="number">${gun_list_tableNumber}</td>
        <td class="name">${data.name}</td>
        <td class="division">${data.division}</td>
        <td class="lank">${Lank_table[data.lank]}</td>
        <td class="gun_model">${data.gun_model}</td>
        <td class="gun_serial">${data.gun_serial}</td>
        <td class="status">${data.status == Status.현보유 ? "" : Status_table[data.status]}</td>
        <td class="note">${data.note}</td>
        `;
}

/**
 * @brief set tbody of gun_list_table
 * @param {GunStatus[]} datalist GunStatus data list
*/
function set_gun_list_table_tbody(datalist) {
    const tbody = gun_list_table.querySelector("tbody")
    tbody.innerHTML = "";
    gun_list_tableNumber = 0;
    datalist.forEach(data => {
        tbody.insertRow().innerHTML = gunStatusToHTML(data);
    });
}