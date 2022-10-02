/**
 * @file dom/edit_state.js
 * @author Sinduy
 * @brief for status editer
 * @requires defines.js | datatypes.js | gun_list.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { body Status } from './defines.js';
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
 * @brief edit_gun_status_list_row
*/
var edit_gun_status_list_row = function () {
    const tbody = gun_list_table.querySelector("tbody");
    const removeButton = document.getElementById("bt_remove");
    const bt_edit_mode = document.getElementById("bt_edit_mode")
    if(editMode) {
        bt_edit_mode.innerHTML = 'save';
    } else {
        bt_edit_mode.innerHTML = 'edit mode';
        selected = [];
        removeButton.remove();
    }

    if(editMode)
    {
        // start edit mode
        const removeButton = document.createElement("button");
        edit_mode_buttons.appendChild(removeButton);
        removeButton.innerHTML = "remove";
        removeButton.setAttribute("id", "bt_remove");
        removeButton.addEventListener('click', (event) => {
            selected.forEach(row => {
                const num = row.querySelector(".num").innerHTML;
                gunStatusArray = gunStatusArray.filter((e) => e.num != num);
            });
            editMode = false;
            edit_gun_status_list_row();
        });
        Object.values(tbody.rows).forEach(row => {
            for(let i = 0; i < GunStatus_Param_Array.length; i++) {
                const param = GunStatus_Param_Array[i];
                const cell = row.querySelector("."+param);
                if(param != "num" && param != "status" && param != "lank") {
                    cell.classList.add("edit");
                    cell.setAttribute("contenteditable", "true");
                }else if(param == "num") {
                    cell.addEventListener('click', (event) => {
                        const i = selected.findIndex((e) => e == row);
                        if(i > -1){
                            selected.splice(i,1);
                            row.classList.remove("selected");
                        }else{
                            selected.push(row);
                            row.classList.add("selected");
                        }
                    });
                }
                cell.addEventListener('input', (event) => {
                    console.log(event);
                });
            }
        });
    }else{
        // end edit mode
        Object.values(tbody.rows).forEach(row => {
            for(let i = 0; i < GunStatus_Param_Array.length; i++) {
                const param = GunStatus_Param_Array[i];
                const cell = row.querySelector("."+param);
                cell.classList.remove("edit");
                row.classList.remove("selected");
                cell.removeAttribute("contenteditable");
            }
        });

        set_gun_list_table_tbody(gunStatusArray);
        set_gun_sum_table_tbody(count_gun_status(gunStatusArray));
    }
}

document.querySelector('#bt_edit_mode').addEventListener('click', (e) => {
    editMode = !editMode;
    edit_gun_status_list_row();
    document.getElementById("edit_status").remove();
});