/**
 * @file gun_sum.js
 * @author Sinduy
 * @brief for #gun_list_table in gun_list.html
 * @requires defines.js | datatypes.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { Status, Status_table } from './defines.js';

const gun_sum_table = document.getElementById("gun_sum_table");

/**
 * @brief set thead of gun_list_table
*/
function set_gun_sum_table_thead() {
    const thead = gun_sum_table.querySelector("thead");
    thead.innerHTML = "";
    let row = thead.insertRow();
    row.innerHTML = `
    <th class="gun_model">${GunSum_ParamNames.gun_model}</th>
    <th class="total">${GunSum_ParamNames.total}</th>
    `
    {
        let i = 0
        do {
            (i < Status_table.length-1) ? i++ : i=0
            cell = row.insertCell();
            cell.outerHTML = `<th>${Status_table[i]}</th>`;
            cell.className = Status_table[i];
        }while(i != 0)
    }
    
}

/**
 * @brief set tbody of gun_list_table
 * @param {GunSum[]} datalist GunSum data list
*/
function set_gun_sum_table_tbody(datalist) {
    const tbody = gun_sum_table.querySelector("tbody")
    tbody.innerHTML = "";
    datalist.forEach(data => {
        let row = tbody.insertRow();
        row.innerHTML = `
        <td class="gun_model">${data.gun_model}</td>
        <td class="total">${data.total}</td>
        `
        {
            let i = 0
            do {
                (i < Status_table.length-1) ? i++ : i=0
                cell = row.insertCell();
                const n = data.status[i];
                cell.className = Status_table[i];
                if(n != 0) {
                    cell.innerHTML = n;
                }else{
                    cell.className += " none";
                    cell.innerHTML = "-";
                }
            }while(i != 0)
        }
    });
}

/**
 * @brief count the number of guns in each status
 * @param {GunStatus[]} datalist GunStatus data list
 * @returns {GunSum[]} GunSum data list
*/
function count_gun_status(datalist) {
    let gun_sum_list = [];
    datalist.forEach(data => {
        const gun_model = data.gun_model;
        let gun_sum = gun_sum_list.find(data => data.gun_model == gun_model);
        if(gun_sum == undefined) {
            gun_sum = new GunSum(gun_model);
            gun_sum_list.push(gun_sum);
        }
        gun_sum.addGunStatus(data.status);
    });
    return gun_sum_list;
}