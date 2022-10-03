/**
 * @file dom/edit_state.js
 * @author Sinduy
 * @brief for status editer
 * @requires defines.js | datatypes.js | gun_list.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { body gun_list_table edit_mode_buttons Status Lank} from './defines.js';
// import { update_gun_list_table } from './gun_list.js';

var editMode = false;
var selected = [];

/** 
 * @brief edit_status
 * @param {GunStatus} gunStatus GunStatus data
*/
var edit_status = function (gunStatus) {
    if(editMode) return;
    if(document.getElementById("edit_status") != null) {
        document.getElementById("edit_status").remove();
    }

    // popup status selections
    let root = document.createElement('div');
    let popup = document.createElement('div');
    let buttons = []
    let note = document.createElement('input');
    let close = document.createElement('button');
    let clear = document.createElement('button');

    body.appendChild(root);
    root.appendChild(popup);

    root.setAttribute('class','popup_background');
    root.setAttribute('id','edit_status');
    popup.setAttribute('class','popup');
    note.setAttribute('placeholder',GunStatus_ParamNames.note);
    close.setAttribute('class','close');
    clear.setAttribute('class','clear');

    note.value = gunStatus.note;
    close.innerHTML = 'X';
    clear.innerHTML = 'clear';
    close.addEventListener('click', () => {
        root.remove();
    });
    clear.addEventListener('click', () => {
        note.value = '';
    });
    for(let i = 0; i < Status_table.length; i++) {
        let status = Status_table[i];
        let button = document.createElement('button');
        popup.appendChild(button);
        buttons.push(button);

        button.setAttribute('class','button _'+i);
        if(gunStatus.status == i) button.classList.add('selected');
        button.innerHTML = status;

        button.addEventListener('click', () => {
            gunStatus.status = i;
            gunStatus.note = note.value;

            // close the popup window
            root.remove();
            update_gun_list_table([gunStatus]);

            set_gun_sum_table_tbody(count_gun_status(gunStatusArray));
        });
    }
    popup.appendChild(note);
    popup.appendChild(clear);
    popup.appendChild(close);
}

/**
 * @brief eatch_param_in_tbody
 * @param {HTMLTableSectionElement} tbody
 * @param {string} param
 * @param {function(Element)} func
*/
function eatch_param_in_tbody(tbody, param, func) {
    Object.values(tbody.rows).forEach(row => {
        const cell = row.querySelector("."+param);
        func(cell);
    });
}

/**
 * @brief eatch_paramlist_in_row
 * @param {HTMLTableRowElement} row
 * @param {string[]} paramlist
 * @param {function(Element)} func
*/
function eatch_paramlist_in_row(row, paramlist, func) {
    paramlist.forEach(param => {
        const cell = row.querySelector("."+param);
        func(cell);
    });
}

/**
 * @brief edit_gun_status
*/
function edit_gun_status() {
    selected = [];
    if(!editMode) return;
    eatch_param_in_tbody(gun_list_table.querySelector("tbody"), "num", (cell) => {
        cell.addEventListener('click', (event) => {
            if(!editMode) return;
            const row = cell.parentNode;
            const i = selected.findIndex((e) => e == row);
            const contenteditableList = ["name", "division", "gun_model", "gun_serial", "note"];
            if(i > -1){
                selected.splice(i,1);
                row.classList.remove("selected");
                eatch_paramlist_in_row(row, contenteditableList, (cell) => {
                    cell.classList.remove("edit");
                    cell.removeAttribute("contenteditable");
                });
            }else{
                selected.push(row);
                row.classList.add("selected");
                eatch_paramlist_in_row(row, contenteditableList, (cell) => {
                    cell.classList.add("edit");
                    cell.setAttribute("contenteditable", "true");
                });
            }
        });
    });
}

/**
 * @brief save_gun_status
*/
function save_gun_status() {
    if(editMode) return;
    selected.forEach(row => {
        if(row.querySelector(".gun_serial").innerHTML == "") return;
        const num = row.querySelector(".num").innerHTML;
        const i = gunStatusArray.findIndex((e) => e.num != num);
        const enumparamlist = ["lank", "status"];
        const contenteditableList = GunStatus_Param_Array.filter((e) => ![...enumparamlist, "num"].includes(e));
        
        let obj = {num : num};
        contenteditableList.forEach((e) => {
            obj[e] = row.querySelector("."+e).innerHTML;
        });
        const lanknum = Lank[row.querySelector(".lank").innerHTML]
        obj["lank"] = lanknum != undefined ? lanknum : 0;
        const statusnum = Status[row.querySelector(".status").innerHTML]
        obj["status"] = statusnum != undefined ? statusnum : 0;


        if(gunStatusArray[i]) {
            gunStatusArray.push(objectToGunStatus(obj));
        }else{
            gunStatusArray[i] = objectToGunStatus(obj);
        }
        
    });
}

/**
 * @brief remove_gun_status
*/
function remove_gun_status() {
    if(editMode) return;
    selected.forEach(row => {
        const num = row.querySelector(".num").innerHTML;
        gunStatusArray = gunStatusArray.filter((e) => e.num != num);
    });
}

const bt_edit_mode = document.getElementById('bt_edit_mode');
const bt_save = document.getElementById('bt_save');
const bt_remove = document.getElementById('bt_remove');
bt_edit_mode.addEventListener('click', (e) => {
    // editMode = !editMode;
    // edit_gun_status_list_row();
    editMode = true;
    edit_gun_status();
    bt_save.removeAttribute('hidden');
    bt_remove.removeAttribute('hidden');
    bt_edit_mode.setAttribute('hidden', 'true');
    const div_edit_status = document.getElementById('edit_status');
    if(div_edit_status)
        div_edit_status.remove();
});
bt_save.addEventListener('click', (e) => {
    editMode = false;
    save_gun_status();
    bt_save.setAttribute('hidden', 'true');
    bt_remove.setAttribute('hidden', 'true');
    bt_edit_mode.removeAttribute('hidden');
    set_gun_list_table_tbody(gunStatusArray);
    set_gun_sum_table_tbody(count_gun_status(gunStatusArray));
});
bt_remove.addEventListener('click', (e) => {
    editMode = false;
    remove_gun_status();
    bt_save.setAttribute('hidden', 'true');
    bt_remove.setAttribute('hidden', 'true');
    bt_edit_mode.removeAttribute('hidden');
    set_gun_list_table_tbody(gunStatusArray);
    set_gun_sum_table_tbody(count_gun_status(gunStatusArray));
});