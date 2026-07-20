const fs = require("fs");

class JSONStore {
  constructor(file) {
    this.file = file;

    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "{}");
    }
  }

  add(obj) {
    if (obj.id === undefined) {
      throw new Error("Object must have an id");
    }

    const db = JSON.parse(fs.readFileSync(this.file, "utf8"));
    db[obj.id] = obj;
    fs.writeFileSync(this.file, JSON.stringify(db));
  }

  read(id) {
    const db = JSON.parse(fs.readFileSync(this.file, "utf8"));
    return db[id] ?? null;
  }
}

function createDB(file = "store.json") {
  return new JSONStore(file);
}

module.exports = { createDB };
