function load_localstorage(dataname) {
    var data = localStorage.getItem(dataname);
    if (data) {
        data = JSON.parse(data);
        return data;
    }
    return null;
}

function save_localstorage(dataname, data) {
    localStorage.setItem(dataname, JSON.stringify(data));
}