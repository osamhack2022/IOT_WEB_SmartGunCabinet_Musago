/**
 * @file objconv.js
 * @author Sinduy
 * @brief program entry point
 * @requires defines.js | datatypes.js
 */

function objectToGunStatus(obj) {
    return new GunStatus(obj.name, obj.division, obj.lank, obj.gun_model, obj.gun_serial, obj.status, obj.note);
}
function objectToAdminInfo(obj) {
    return new AdminInfo(obj.name, obj.position, obj.lank, obj.code);
}

function objectToGunStatusArray(obj) {
    return obj.map(objectToGunStatus);
}
function objectToAdminInfoArray(obj) {
    return obj.map(objectToAdminInfo);
}

function gunStatusToObj(gunStatus) {
    return {
        name: gunStatus.name,
        division: gunStatus.division,
        lank: gunStatus.lank,
        gun_model: gunStatus.gun_model,
        gun_serial: gunStatus.gun_serial,
        status: gunStatus.status,
        note: gunStatus.note
    }
}
function adminInfoToObj(adminInfo) {
    return {
        name: adminInfo.name,
        position: adminInfo.position,
        lank: adminInfo.lank,
        code: adminInfo.code
    }
}