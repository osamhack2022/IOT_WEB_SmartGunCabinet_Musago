/**
 * @file datatypes.js
 * @author Sinduy
 * @description class for data types
 */

// #    성명	소속	계급	총기종류	총기번호	열외	비고
// num  name	division	lank	gun_model	gun_serial	status	note
// intiger  string	string	enum	string	unsigned intiger	enum	string
/**
 * @type {Object.<string, string>}
 * @readonly
*/
const GunStatus_ParamNames = {
    num: "#",
    name: "성명",
    division: "소속",
    lank: "계급",
    gun_model: "총기종류",
    gun_serial: "총기번호",
    status: "열외",
    note: "비고"
}
/**
 * @type {Array.<string>}
 * @readonly
 */
const GunStatus_Param_Array = Object.keys(GunStatus_ParamNames);
class GunStatus {
    /**
     * @param {number} num #
     * @param {string} name 성명
     * @param {string} division 소속
     * @param {Lank} lank 계급
     * @param {string} gun_model 총기종류
     * @param {string} gun_serial 총기번호
     * @param {Status} status 열외
     * @param {string} note 비고
     */
    constructor(num ,name, division, lank, gun_model, gun_serial, status, note = "") {
        this.num = num;
        this.name = name;
        this.division = division;
        this.lank = lank;
        this.gun_model = gun_model;
        this.gun_serial = gun_serial;
        this.status = status;
        this.note = note;
    }

    static crateEmpty() {
        return new GunStatus(0, "", "", Lank.없음, "", 0, Status.현보유, "");
    }
}

// 총기	총보유	열외	휴가	현보유
// gun_model	total	status	vacation	current
// string	intiger	intiger	intiger	intiger
/**
 * @type {Object.<string, string>}
 * @readonly
*/
const GunSum_ParamNames = {
    gun_model: "총기",
    total: "총보유",
    status: "열외",
}
class GunSum {
    /**
     * @param {string} gun_model 총기
     * @param {number} total 총보유
     * @param {number[Status]} status 열외
    */
    constructor(gun_model, total=0, status=new Array(Status_table.length).fill(0)) {
        this.gun_model = gun_model
        this.total = total
        this.status = status
    }

    /**
     * @param {Status} status 
     */
    addGunStatus(status) {
        this.total ++;
        this.status[status] ++;
    }

    /**
     * @param {GunSum} gunsum 
     */
    addGunSum(gunsum) {
        this.total += gunsum.total;
        for (let i = 0; i < Status_table.length; i++) {
            this.status[i] += gunsum.status[i];
        }
    }
}

// 성명	직책	계급	지문코드
// name	position	lank	code
// string	string	enum	unsigned intiger
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
}
