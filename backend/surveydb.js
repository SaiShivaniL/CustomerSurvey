var { MongoClient } = require("mongodb");
const DBNAME = "EmployeeDB";

class DbConnect {
  constructor(COLLECTIONNAME) {
    const url = "mongodb+srv://vamshimanyam:Vams%40123@survey.dbgqyrx.mongodb.net/EmployeeDB";
    this.client = new MongoClient(url);
    this.COLLECTIONNAME = COLLECTIONNAME;
  }
  init() {
    var res = this.client.connect();
    console.log("connected");
    this.db = this.client.db(DBNAME);
    // console.log(this.db)
  }
  
  save(doc) {
    this.db.collection(this.COLLECTIONNAME).insertOne(doc, function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  }

  async find() {
    var a = this.db.collection(this.COLLECTIONNAME).find({});
    return await a.toArray();
  }
  
  async findbyuser(name) {
    var a = this.db.collection(this.COLLECTIONNAME).find({ username: name });
    return await a.toArray();
  }

  async findbyemail(email){
    var a = this.db.collection(this.COLLECTIONNAME).find({ email: email });
    return await a.toArray();
  }
  async findbyid(id){
    var a = this.db.collection(this.COLLECTIONNAME).find({ id: id });
    return await a.toArray();
  }

  update(doc, doc1) {
    this.db
      .collection(this.COLLECTIONNAME)
      .updateMany(doc, { $set: doc1 }, function (err, res) {
        if (err) throw err;
        console.log(res);
      });
  }

  delete(name) {
    this.db
      .collection(this.COLLECTIONNAME)
      .deleteMany({ username: name }, function (err, res) {
        if (err) throw err;
        console.log(res);
      });
  }

  deletebyid(id){
    this.db
    .collection(this.COLLECTIONNAME)
    .deleteMany({ id: id }, function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  }
 
  drop() {
    this.db.collection(this.COLLECTIONNAME).drop();
  }
}

module.exports = DbConnect;
