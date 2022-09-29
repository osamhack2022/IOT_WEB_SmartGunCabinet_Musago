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
        name: gunStatus.name.value,
        division: gunStatus.division.value,
        lank: gunStatus.lank.value,
        gun_model: gunStatus.gun_model.value,
        gun_serial: gunStatus.gun_serial.value,
        status: gunStatus.status.value,
        note: gunStatus.note.value
    }
}
function adminInfoToObj(adminInfo) {
    return {
        name: adminInfo.name.value,
        position: adminInfo.position.value,
        lank: adminInfo.lank.value,
        code: adminInfo.code.value
    }
}