const UID = require('short-unique-id');

function newId(str) {
    const uid = new UID({ length: 6, dictionary: "number" });
    const id = str + uid.rnd();
    console.log(id);
    return id;
}

module.exports = newId;