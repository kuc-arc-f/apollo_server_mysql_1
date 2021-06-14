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

}
