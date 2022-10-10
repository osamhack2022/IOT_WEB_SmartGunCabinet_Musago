/**
 * @file defines.js
 * @author Sinduy
 * @brief define constants and tables
 */

/** 
 * @type {number} 
 * @breif number of Gun cabinet slots
 */
var CABINET_SIZE = 10;

/**
 *  @type {Array<>} 
 *  @breif array of Gun cabinet slots
 */
var gunStatusArray = [];

const body = document.body;
const gun_sum_table = document.getElementById("gun_sum_table");
const gun_list_table = document.getElementById("gun_list_table");
const edit_mode_buttons = document.getElementById("edit_mode_buttons");

/**
 * @enum {number}
 * @readonly
 * @description 계급
 */
const Lank = {
    "없음" :  0,
    "이병" :  1,
    "일병" :  2,
    "상병" :  3,
    "병장" :  4,
    "하사" :  5,
    "중사" :  6,
    "상사" :  7,
    "원사" :  8,
    "준위" :  9,
    "소위" : 10,
    "중위" : 11,
    "대위" : 12,
    "소령" : 13,
    "중령" : 14,
    "대령" : 15,
    "준장" : 16,
    "소장" : 17,
    "중장" : 18,
    "대장" : 19,
};
const Lank_table = Object.keys(Lank);

/**
 * @enum {number}
 * @readonly
 * @description 열외
 */
const Status = {
    "현보유" :   0,
    "휴가"   :   1,
    "근무"   :   2,
    "기타"   :   3,
}
const Status_table = Object.keys(Status);