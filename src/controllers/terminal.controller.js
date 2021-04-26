const pool = require("../database/db")
const TerminalController = {
    async createTerminal(req,res){
        const { name_terminal, gate} = req.body
       
        pool.query('INSERT INTO terminal (name_terminal, gate) VALUES ($1, $2)',
         [name_terminal, gate], (error, result) => {
          if (error) {
            throw error
          }
          res.status(200).json("Terminal has been added!")
    });
        
},
    async getAllTerminals(req,res){
        pool.query('SELECT * FROM terminal', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneTerminal(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM treminal WHERE treminal_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
    },
    async updateTerminal(req,res){
        const id = parseInt(req.params.id)
        const { name_terminal, gate} = req.body
    pool.query(
      'UPDATE terminal SET name_terminal = $1, gate = $2 WHERE terminal_id = $3',
      [name_terminal, gate, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Terminal has been modified with ID: ${id}`)
      }
    )
    },
    async deleteTerminal(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`Terminal has been deleted with ID: ${id}`)
        })
    }
}

module.exports = TerminalController