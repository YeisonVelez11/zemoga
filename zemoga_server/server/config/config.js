// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;
// ============================
//  Environment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
process.env.HOST = process.env.HOST || "http://localhost:3000/";
// ============================
//  Database
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/zemoga';
    //urlDB = 'mongodb://test:123@cluster0-shard-00-00.ie6dz.mongodb.net:27017,cluster0-shard-00-01.ie6dz.mongodb.net:27017,cluster0-shard-00-02.ie6dz.mongodb.net:27017/zemoga?ssl=true&replicaSet=atlas-3uhw97-shard-0&authSource=admin&retryWrites=true&w=majority';

} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
