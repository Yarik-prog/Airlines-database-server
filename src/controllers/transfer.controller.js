const pool = require("../database/db")
const TransferController = {
    async createTransfer(req,res){
        const { flight_id, ticket_id} = req.body
       
        pool.query('INSERT INTO transfer (flight_id, ticket_id) VALUES ($1, $2)',
         [flight_id, ticket_id], (error, result) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json("Transfer has been added!")
    });
        
},
    async getAllTransfers(req,res){
        pool.query('SELECT * FROM transfer', (error, results) => {
            if (error) {
              //throw error
          return res.status(400).json({err:error.message})
            }
            res.status(200).json(results.rows)
          })
    },
   // async getOneTerminal(req,res){
      //  const id = parseInt(req.params.id)
      //  pool.query('SELECT * FROM treminal WHERE treminal_id = $1', [id], (error, results) => {
       //   if (error) {
       //     throw error
        //  }
         // res.status(200).json(results.rows)
       // })
   // },
   // async updateTerminal(req,res){
     //   const id = parseInt(req.params.id)
      //  const { name_terminal, gate} = req.body
  //  pool.query(
     // 'UPDATE terminal SET name_terminal = $1, gate = $2 WHERE terminal_id = $3',
    //  [name_terminal, gate, id],
     // (error, results) => {
     //   if (error) {
     //     throw error
     //  }
     //  res.status(200).send(`Terminal has been modified with ID: ${id}`)
     // }
   // )
   // },
   // async deleteTransfer(req,res){
    //    const id = parseInt(req.params.id)
  
     //   pool.query('DELETE FROM transfer WHERE terminal_id = $1', [id], (error, results) => {
      //    if (error) {
      //      throw error
       //   }
        //  res.status(200).send(`Transfer has been deleted with ID: ${id}`)
       // })
   // }
}

module.exports = TransferController