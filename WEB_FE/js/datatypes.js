/**
 * @file datatypes.js
 * @author Sinduy
 * @brief class for data types
 */

class GunStatus {
    //성명	소속	계급	총기종류	총기번호	열외	비고
    //string	string	enum	string	unsigned intiger	enum	string
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
        this.name.value = name;               // 성명
        this.division.value = division;       // 소속
        this.lank.value = lank;               // 계급
        this.gun_model.value = gun_model;     // 총기종류
        this.gun_serial.value = gun_serial;   // 총기번호
        this.status.value = status;           // 열외
        this.note.value = note;               // 비고
        this.name.name = "성명";
        this.division.name = "소속";
        this.lank.name = "계급";
        this.gun_model.name = "총기종류";
        this.gun_serial.name = "총기번호";
        this.status.name = "열외";
        this.note.name = "비고";
    }
    
    toArray() {
        return [ this.name.value, this.division.value, this.lank.value, this.gun_model.value, this.gun_serial.value, this.status.value, this.note.value ]
    }
}

class AdminInfo {
    //성명	직책	계급	지문코드
    //string	string	enum	unsigned intiger
    /**
     * @param {string} name 성명
     * @param {string} position 직책
     * @param {Lank} lank 계급
     * @param {number} code 지문코드
     */
    constructor(name, position,lank,code) {
        this.name.value = name;             //  성명
        this.position.value = position;     //  직책
        this.lank.value = lank;             //  계급
        this.code.value = code;             //  지문코드
        this.name.name = "성명";
        this.position.name = "직책";
        this.lank.name = "계급";
        this.code.name = "지문코드";
    }

    toArray() {
        return [ this.name.value, this.position.value, this.lank.value, this.code.value ]
    }
}
