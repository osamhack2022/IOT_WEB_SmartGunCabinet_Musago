/**
 * @file objconv.js
 * @author Sinduy
 * @brief program entry point
 * @requires defines.js
 * @requires datatypes.js
 */

/**
 * @param {Object} obj
 * @returns {GunStatus}
*/
function objectToGunStatus(obj) {
    return new GunStatus(obj.num, obj.name, obj.division, obj.lank, obj.gun_model, obj.gun_serial, obj.status, obj.note);
}
/**
 * @param {Object} obj
 * @returns {AdminInfo}
*/
function objectToAdminInfo(obj) {
    return new AdminInfo(obj.name, obj.position, obj.lank, obj.code);
}

/**
 * @param {Array<Object>} obj
 * @returns {Array<GunStatus>}
*/
function objectToGunStatusArray(obj) {
    return obj.map(objectToGunStatus);
}
/**
 * @param {Array<Object>} obj
 * @returns {Array<AdminInfo>}
*/
function objectToAdminInfoArray(obj) {
    return obj.map(objectToAdminInfo);
}

/**
 * @param {GunStatus} gunStatus
 * @returns {Object}
*/
function gunStatusToObj(gunStatus) {
    return {
        num: gunStatus.num,
        name: gunStatus.name,
        division: gunStatus.division,
        lank: gunStatus.lank,
        gun_model: gunStatus.gun_model,
        gun_serial: gunStatus.gun_serial,
        status: gunStatus.status,
        note: gunStatus.note
    }
}
/**
 * @param {AdminInfo} adminInfo
 * @returns {Object}
*/
function adminInfoToObj(adminInfo) {
    return {
        name: adminInfo.name,
        position: adminInfo.position,
        lank: adminInfo.lank,
        code: adminInfo.code
    }
}