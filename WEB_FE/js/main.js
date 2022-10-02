/**
 * @file main.js
 * @author Sinduy
 * @brief program entry point
 * @requires defines.js | datatypes.js | objconv.js | dom/gun_list.js | dom/gun_sum.js
 */

// import { GunStatus, AdminInfo } from './datatypes.js';
// import { Lank, Status, Lank_table, Status_table } from './defines.js';
// import { objectToGunStatus, objectToAdminInfo, objectToGunStatusArray, objectToAdminInfoArray, gunStatusToObj, adminInfoToObj } from './objconv.js';
// import { set_gun_list_table_thead, set_gun_list_table_tbody } from './dom/gun_list.js';
// import { set_gun_sum_table_thead, set_gun_sum_table_tbody } from './dom/gun_sum.js';
/** @type {Array<>} */
var gunStatusArray = [];
{
    let obj = [
        {
            "num": 1,
            "name": "김병장",
            "division": "1소대",
            "lank": Lank.병장,
            "gun_model": "K2",
            "gun_serial": "3132321",
            "status": Status.현보유,
            "note": ""
        },
        {
            "num": 2,
            "name": "이상병",
            "division": "2소대",
            "lank": Lank.상병,
            "gun_model": "K2C1",
            "gun_serial": "4568431",
            "status": Status.근무,
            "note": ""
        },
        {
            "num": 5,
            "name": "박일병",
            "division": "1소대",
            "lank": Lank.일병,
            "gun_model": "K2C1",
            "gun_serial": "4564631",
            "status": Status.기타,
            "note": "파견"
        }
    ]
    gunStatusArray = objectToGunStatusArray(obj);
}

set_gun_list_table_thead();
set_gun_list_table_tbody(gunStatusArray);
set_gun_sum_table_thead();
set_gun_sum_table_tbody(count_gun_status(gunStatusArray));