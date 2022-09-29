/**
 * @file main.js
 * @author Sinduy
 * @brief program entry point
 * @requires defines.js | datatypes.js
 */

// import { GunStatus, AdminInfo } from './datatypes.js';
// import { Lank, Status, Lank_table, Status_table } from './defines.js';

const gun_list_table = document.getElementById("gun_list_table");

function set_gun_list_table_thead() {
    const thead = gun_list_table.querySelector("thead");
    thead.innerHTML = `
        <tr>
            <th></th>
            <th>${GunStatus_ParamNames.name}</th>
            <th>${GunStatus_ParamNames.division}</th>
            <th>${GunStatus_ParamNames.lank}</th>
            <th>${GunStatus_ParamNames.gun_model}</th>
            <th>${GunStatus_ParamNames.gun_serial}</th>
            <th>${GunStatus_ParamNames.status}</th>
            <th>${GunStatus_ParamNames.note}</th>
        </tr>`;
}

function gunStatusToHTML(n,data) {
    return `
        <tr>
            <td class="number">${n}</td>
            <td class="name">${data.name}</td>
            <td class="division">${data.division}</td>
            <td class="lank">${Lank_table[data.lank]}</td>
            <td class="gun_model">${data.gun_model}</td>
            <td class="gun_serial">${data.gun_serial}</td>
            <td class="status">${Status_table[data.status]}</td>
            <td class="note">${data.note}</td>
        </tr>
        `;
}

function set_gun_list_table_tbody(datalist) {
    const tbody = gun_list_table.querySelector("tbody")
    tbody.innerHTML = "";
    let n = 1;
    datalist.forEach(data => {
        tbody.insertAdjacentHTML("beforeend", gunStatusToHTML(n++,data));
    });
}