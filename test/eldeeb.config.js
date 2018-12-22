import path from 'path'
const mode = process.env.NODE_ENV || 'development' //npm dev, check package.json->scripts

const config = {
  root: path.resolve(), //`${path.resolve()}${path.sep}` 'D:/Downloads/__projects/NodeJs/almogtama3.com/'
  db: {
    user: 'xxyyzz2050',
    pass: process.env.dbPass || 'Xx159753@@',
    host:
      mode == 'development'
        ? 'cluster-test-kuwit.gcp.mongodb.net'
        : 'almogtama3-gbdqa.gcp.mongodb.net',
    srv: true,
    db: mode == 'development' ? 'test' : 'database',
    debug: mode == 'development' ? true : false,
    models: `${this.root}/store/db/schema/{collection}.js` //absolute or related to eldeeb/lib/db-mongoDB (not to this file, or the file contains the queries)
    //nx: model=require(models.replace('{collection}',coll))
  },

  github: ['xxyyzz2050@gmail.com', 'Xx159753@@', '$key']
}
//_id: 5be92fb487e94116ac606ffe

export default config
export const root = config.root,
  db = config.db

//to import only a part of this file use: import {root} from 'eldeeb.config.js'
// to import all : import * as config from '..' (or import config from '..')
