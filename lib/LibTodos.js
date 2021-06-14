import Mysql from "../lib/Mysql"

//
export default {
  get_items :async function(){
    try {
      var item = []
      let connection =  await Mysql.get_connection()
      //console.log("uid=", req.query.uid)
      var results = await connection.query(`
      SELECT * FROM todos order by id desc LIMIT 100
      `)
      var ret ={
        todos: results
      }  
      await connection.end();
// console.log( item)            
      return results
    } catch (err) {
        throw new Error('Error , get_items');
    }          
  },    
  get_todo :async function(id){
    try {
      let connection =  await Mysql.get_connection()    
      // console.log(req.query );
      let sql = `
        SELECT * FROM todos where id=${id}
      `;
      var todos = await connection.query(sql)
      //console.log(post);
      const item= todos[0]
      await connection.end();      
// console.log( item)            
      return item
    } catch (err) {
      throw new Error('Error , get_todo');
    }          
  },
  add_todo :async function(args){
    try {
      let connection =  await Mysql.get_connection()    
      let sql = `
      INSERT INTO todos (title ,created_at ) VALUES
      ('${ args.title }',
      now() 
      )
      `;
      var results = await connection.query(sql)       
      await connection.end();      
// console.log( item)            
      return args
    } catch (err) {
      throw new Error('Error , add_todo');
    }          
  },
  update_todo :async function(args){
    try {
      let connection =  await Mysql.get_connection()    
      let sql = `
      update todos set title = '${ args.title }' 
      where id = ${args.id}
      `;     
      var results = await connection.query(sql)       
      await connection.end();      
// console.log( item)            
      return args
    } catch (err) {
      throw new Error('Error , add_todo');
    }          
  },
  delete_todo :async function(args){
    try {
      let connection =  await Mysql.get_connection()    
      let sql = `
      delete from todos where id = ${args.id};
      `;       
      var results = await connection.query(sql)       
      await connection.end();      
// console.log( item)            
      return args
    } catch (err) {
      throw new Error('Error , delete_todo');
    }          
  },  
}
