const pool = require("../database/db")
const CrewController = {
    async createCrew(req,res){
        const { crew_num, type_crew} = req.body
      
        pool.query('INSERT INTO crew (crew_num, type_crew) VALUES ($1, $2)',
         [crew_num, type_crew], (error, result) => {
          if (error) {
            throw error
          }
          res.status(200).json("Crew has been added!")
    });
        
},
    async getAllCrews(req,res){
        pool.query('SELECT * FROM crew', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneCrew(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM crew WHERE crew_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
    },
    async updateCrew(req,res){
        const id = parseInt(req.params.id)
        const { crew_num, type_crew} = req.body
    pool.query(
      'UPDATE crew SET crew_num = $1, type_crew = $2 WHERE crew_id = $3',
      [crew_num, type_crew, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Crew has been modified with ID: ${id}`)
      }
    )
    },
    async deleteCrew(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM crew WHERE crew_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`Crew has been deleted with ID: ${id}`)
        })
    }
}

module.exports = CrewController