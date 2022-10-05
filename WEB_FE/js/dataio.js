/**
 * @file dataio.js
 * @author Sinduy
 * @brief data io
*/

/**
 * @param {string} dataname
 * @returns {any}
 */
function load_localstorage(dataname) {
    var data = localStorage.getItem(dataname);
    if (data) {
        data = JSON.parse(data);
        return data;
    }
    return null;
}

/**
 * @param {string} dataname
 * @param {any} data
*/
function save_localstorage(dataname, data) {
    localStorage.setItem(dataname, JSON.stringify(data));
}