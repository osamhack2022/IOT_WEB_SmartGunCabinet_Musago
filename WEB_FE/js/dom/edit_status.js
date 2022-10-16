/**
 * @file dom/edit_state.js
 * @author Sinduy
 * @brief for status editer
 * @requires defines.js
 * @requires datatypes.js
 * @requires gun_list.js
 * @requires gunsum.js
 * @requires dataio.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { body gun_list_table edit_mode_buttons Status Lank} from './defines.js';
// import { update_gun_list_table } from './gun_list.js';
// import { count_gun_status set_gun_sum_table_tbody } from './gunsum.js';
// import { save_localstorage } from './dataio.js';

var editMode = false;
var selected = [];

/** 
 * @brief 열외 수정 모드로 전환
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

        button.addEventListener('click', function () {
            //gunStatus = gunStatusArray.find(data => data.num == gunStatus.num);
            gunStatus.status = i;
            gunStatus.note = note.value;

            // close the popup window
            root.remove();
            update_gun_list_table([gunStatus]);
            
            save_gun_status();
            save_localstorage("gunStatusArray", gunStatusArray);

            set_gun_sum_table_tbody(count_gun_status(gunStatusArray));

            this.removeEventListener('click', arguments.callee);
        });
    }
    popup.appendChild(note);
    popup.appendChild(clear);
    popup.appendChild(close);
}

function edit_lank(e){
    if(!editMode) return;
    document.getElementById("edit_lank")?.remove();

    // popup status selections
    let root = document.createElement('div');
    let popup = document.createElement('div');
    let buttons = []

    body.appendChild(root);
    root.appendChild(popup);

    root.setAttribute('class','popup_background');
    root.setAttribute('id','edit_lank');
    popup.setAttribute('class','popup');
    for(let i = 0; i < Lank_table.length; i++) {
        const lank = Lank_table[i];
        const button = document.createElement('button');
        popup.appendChild(button);
        buttons.push(button);

        button.setAttribute('class','button _'+i);
        button.innerHTML = lank;
        if(e.target.innerHTML == lank) button.classList.add('selected');

        button.addEventListener('click', () => {
            e.target.innerHTML = lank;
            root.remove();
        });
    }
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
 * @brief on edit mode!!!
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
                eatch_paramlist_in_row(row, ["lank"], (cell) => {
                    cell.removeEventListener('click', edit_lank);
                });
            }else{
                selected.push(row);
                row.classList.add("selected");
                eatch_paramlist_in_row(row, contenteditableList, (cell) => {
                    cell.classList.add("edit");
                    cell.setAttribute("contenteditable", "true");
                });
                eatch_paramlist_in_row(row, ["lank"], (cell) => {
                    cell.removeEventListener('click', edit_lank);
                    cell.addEventListener('click', edit_lank);
                });
            }

            document.getElementById("edit_lank")?.remove();
            this.removeEventListener('click', arguments.callee);
        });
    });
}

/**
 * @brief save gun_status at gunStatusArray
*/
function save_gun_status() {
    if(editMode) return;
    selected.forEach(row => {
        const num = row.querySelector(".num").innerHTML;
        const i = gunStatusArray.findIndex((e) => e.num == num);
        if(row.querySelector(".gun_serial").innerHTML == "") {
            if(i >= 0) {
                gunStatusArray.splice(i,1);
            }
            return
        }
        const enumparamlist = ["lank", "status"];
        const contenteditableList = GunStatus_Param_Array.filter((e) => ![...enumparamlist, "num"].includes(e));
        
        let obj = {num : num};
        contenteditableList.forEach((e) => {
            obj[e] = row.querySelector("."+e).innerHTML;
        });
        obj["lank"] = Lank[row.querySelector(".lank").innerHTML] ?? 0;
        obj["status"] = Status[row.querySelector(".status").innerHTML] ?? 0;

        if(i < 0) {
            gunStatusArray.push(objectToGunStatus(obj));
        }else{
            gunStatusArray[i] = objectToGunStatus(obj);
        }
        
    });
}

/**
 * @brief remove gun_status row in gun_list_table tbody
*/
function remove_gun_status() {
    if(editMode) return;
    selected.forEach(row => {
        const num = row.querySelector(".num").innerHTML;
        gunStatusArray = gunStatusArray.filter((e) => e.num != num);
    });
}

// button events
const bt_edit_mode = document.getElementById('bt_edit_mode');
const bt_save = document.getElementById('bt_save');
const bt_remove = document.getElementById('bt_remove');
bt_edit_mode.addEventListener('click', function (e) {
    editMode = true;
    gun_list_table.classList.add("edit");
    edit_gun_status();
    bt_save.removeAttribute('hidden');
    bt_remove.removeAttribute('hidden');
    bt_edit_mode.setAttribute('hidden', 'true');
    const div_edit_status = document.getElementById('edit_status');
    if(div_edit_status)
        div_edit_status.remove();
});
bt_save.addEventListener('click', function (e) {
    editMode = false;
    gun_list_table.classList.remove("edit");
    save_gun_status();
    save_localstorage("gunStatusArray", gunStatusArray);
    // bt_save.setAttribute('hidden', 'true');
    // bt_remove.setAttribute('hidden', 'true');
    // bt_edit_mode.removeAttribute('hidden');
    // set_gun_list_table_tbody(gunStatusArray);
    // set_gun_sum_table_tbody(count_gun_status(gunStatusArray));
    location.reload();  // 저장 후 열외 수정안되는 버그때문에 임시로 리로드
});
bt_remove.addEventListener('click', function (e) {
    editMode = false;
    gun_list_table.classList.remove("edit");
    remove_gun_status();
    save_localstorage("gunStatusArray", gunStatusArray);
    bt_save.setAttribute('hidden', 'true');
    bt_remove.setAttribute('hidden', 'true');
    bt_edit_mode.removeAttribute('hidden');
    set_gun_list_table_tbody(gunStatusArray);
    set_gun_sum_table_tbody(count_gun_status(gunStatusArray));
});