safebryan@hospital-central:~/PruebaPractica/api-central-hospitales$ npm start

> api-central-hospitales@1.0.0 start
> node src/app.js

❌ Error al inicializar la base de datos: Error: connect ECONNREFUSED 10.0.0.4:3306
    at Object.createConnectionPromise [as createConnection] (/home/safebryan/PruebaPractica/api-central-hospitales/node_modules/mysql2/promise.js:19:31)
    at createDatabaseAndUser (/home/safebryan/PruebaPractica/api-central-hospitales/src/config/initDB.js:6:38)
    at initDB (/home/safebryan/PruebaPractica/api-central-hospitales/src/config/initDB.js:86:9)
    at Object.<anonymous> (/home/safebryan/PruebaPractica/api-central-hospitales/src/app.js:74:1)
    at Module._compile (node:internal/modules/cjs/loader:1364:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)
    at Module.load (node:internal/modules/cjs/loader:1203:32)
    at Module._load (node:internal/modules/cjs/loader:1019:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
    at node:internal/main/run_main_module:28:49 {
  code: 'ECONNREFUSED',
  errno: -111,
  sqlState: undefined
}
safebryan@hospital-central:~/PruebaPractica/api-central-hospitales$