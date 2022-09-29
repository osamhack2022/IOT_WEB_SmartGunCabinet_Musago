/**
 * @file main.js
 * @author Sinduy
 * @brief program entry point
 * @requires defines.js | datatypes.js | objconv.js | dom/gun_list.js
 */

// import { GunStatus, AdminInfo } from './datatypes.js';
// import { Lank, Status, Lank_table, Status_table } from './defines.js';
// import { objectToGunStatus, objectToAdminInfo, objectToGunStatusArray, objectToAdminInfoArray, gunStatusToObj, adminInfoToObj } from './objconv.js';
// import { set_gun_list_table_thead, set_gun_list_table_tbody } from './dom/gun_list.js';

set_gun_list_table_thead();
{
    let obj = [
        {
            "name": "김병장",
            "division": "1소대",
            "lank": Lank.P_4,
            "gun_model": "K2",
            "gun_serial": "3132321",
            "status": Status.NONE,
            "note": ""
        },
        {
            "name": "이상병",
            "division": "2소대",
            "lank": Lank.P_3,
            "gun_model": "K2C1",
            "gun_serial": "4568431",
            "status": Status.WORK,
            "note": ""
        },
        {
            "name": "박일병",
            "division": "1소대",
            "lank": Lank.P_2,
            "gun_model": "K2C1",
            "gun_serial": "4564631",
            "status": Status.MISC,
            "note": "파견"
        }
    ]
    const gunStatusArray = objectToGunStatusArray(obj);
    set_gun_list_table_tbody(gunStatusArray);
}