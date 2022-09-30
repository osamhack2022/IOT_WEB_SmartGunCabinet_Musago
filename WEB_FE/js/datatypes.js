/**
 * @file datatypes.js
 * @author Sinduy
 * @brief class for data types
 */

//성명	소속	계급	총기종류	총기번호	열외	비고
//string	string	enum	string	unsigned intiger	enum	string
const GunStatus_ParamNames = {
    name: "성명",
    division: "소속",
    lank: "계급",
    gun_model: "총기종류",
    gun_serial: "총기번호",
    status: "열외",
    note: "비고"
}
class GunStatus {
    /**
     * @param {string} name 성명
     * @param {string} division 소속
     * @param {Lank} lank 계급
     * @param {string} gun_model 총기종류
     * @param {number} gun_serial 총기번호
     * @param {Status} status 열외
     * @param {string} note 비고
     */
    constructor(name, division, lank, gun_model, gun_serial, status, note) {
        this.name = name;
        this.division = division;
        this.lank = lank;
        this.gun_model = gun_model;
        this.gun_serial = gun_serial;
        this.status = status;
        this.note = note;
    }
    
    /**
     * @returns {string[]} array of GunStatus
     */
    toArray() {
        return [ this.name, this.division, this.lank, this.gun_model, this.gun_serial, this.status, this.note ]
    }
}

//성명	직책	계급	지문코드
//string	string	enum	unsigned intiger
const AdminInfo_ParamNames = {
    name: "성명",
    position: "직책",
    lank: "계급",
    code: "지문코드"
}
class AdminInfo {
    /**
     * @param {string} name 성명
     * @param {string} position 직책
     * @param {Lank} lank 계급
     * @param {number} code 지문코드
     */
    constructor(name, position,lank,code) {
        this.name = name;
        this.position = position;
        this.lank = lank;
        this.code = code;
    }

    /**
     * @returns {string[]} array of AdminInfo
    */
    toArray() {
        return [ this.name, this.position, this.lank, this.code ]
    }
}
