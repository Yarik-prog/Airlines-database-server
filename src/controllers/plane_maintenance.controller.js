const pool = require("../database/db")
const MaintenanceController = {
    async createMaintence(req,res){
        const { event_date, service_crew_num, tail_code, result} = req.body
       
        pool.query('INSERT INTO plane_maintenance (event_date, service_crew_num, tail_code, result) VALUES ($1, $2, $3, $4)',
         [event_date, service_crew_num, tail_code, result], (error, result) => {
          if (error) {
            throw error
          }
          res.status(200).json("Maintenance has been added!")
    });
        
},
    async getAllMaintences(req,res){
        pool.query('SELECT * FROM plane_maintenance', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneMaintence(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM plane_maintenance WHERE plane_maintenance_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
    },
    async updateMaintence(req,res){
        const id = parseInt(req.params.id)
        const { event_date, service_crew_num, tail_code, result} = req.body
    pool.query(
      'UPDATE plane_maintenance SET event_date = $1, service_crew_num = $2, tail_code = $3, result = $4 WHERE plane_maintenance_id = $5',
      [event_date, service_crew_num, tail_code, result, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Maintence has been modified with ID: ${id}`)
      }
    )
    },
    async deleteMaintence(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM plane_maintenance WHERE plane_maintenance_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`Maintence has been deleted with ID: ${id}`)
        })
    }
}

module.exports = MaintenanceController