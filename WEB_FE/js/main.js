/**
 * @file main.js
 * @author Sinduy
 * @brief program entry point
 * @requires defines.js
 * @requires datatypes.js
 * @requires objconv.js
 * @requires dataio.js
 * @requires dom/gun_list.js
 * @requires dom/gun_sum.js
 */

// import { GunStatus, AdminInfo } from './datatypes.js';
// import { Lank, Status, Lank_table, Status_table } from './defines.js';
// import { objectToGunStatus, objectToAdminInfo, objectToGunStatusArray, objectToAdminInfoArray, gunStatusToObj, adminInfoToObj } from './objconv.js';
// import { set_gun_list_table_thead, set_gun_list_table_tbody } from './dom/gun_list.js';
// import { set_gun_sum_table_thead, set_gun_sum_table_tbody } from './dom/gun_sum.js';
// import { load_localstorage } from './dataio.js';

gunStatusArray = objectToGunStatusArray(load_localstorage("gunStatusArray") ?? gunStatusArray);
CABINET_SIZE = load_localstorage("CABINET_SIZE") ?? CABINET_SIZE;

set_gun_list_table_thead();
set_gun_list_table_tbody(gunStatusArray);
set_gun_sum_table_thead();
set_gun_sum_table_tbody(count_gun_status(gunStatusArray));