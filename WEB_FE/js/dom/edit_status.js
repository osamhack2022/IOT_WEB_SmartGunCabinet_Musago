/**
 * @file dom/edit_state.js
 * @author Sinduy
 * @brief for status editer
 * @requires defines.js | datatypes.js | gun_list.js
 */

// import { GunStatus, GunStatus_ParamNames} from './datatypes.js';
// import { body Status } from './defines.js';
// import { update_gun_list_table } from './gun_list.js';


/** 
 * @brief edit_status
 * @param {GunStatus} gunStatus GunStatus data
*/
var edit_status = function (gunStatus) {
    if(document.getElementById("edit_status") != null) {
        document.getElementById("edit_status").remove();
    }

    // popup status selections
    let root = document.createElement('div');
    let popup = document.createElement('div');
    let buttons = []
    let note = document.createElement('input');
    let close = document.createElement('button');

    body.appendChild(root);
    root.appendChild(popup);

    root.setAttribute('class','popup_background');
    root.setAttribute('id','edit_status');
    popup.setAttribute('class','popup');
    note.setAttribute('placeholder',GunStatus_ParamNames.note);
    close.setAttribute('class','close');

    note.value = gunStatus.note;
    close.innerHTML = 'X';
    close.addEventListener('click', () => {
        root.remove();
    });
    for(let i = 0; i < Status_table.length; i++) {
        let status = Status_table[i];
        let button = document.createElement('button');
        popup.appendChild(button);
        buttons.push(button);

        button.setAttribute('class','button _'+i);
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
    popup.appendChild(close);
}