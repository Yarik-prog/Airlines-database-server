const pool = require("../database/db")
const PlaneController = {
    async createPlane(req,res){
        const { tail_code, name_plane, model, seats_count, flight_range_km, crew_num, plane_condition} = req.body
        
        pool.query('INSERT INTO plane (tail_code, name_plane, model, seats_count, flight_range_km, crew_num, plane_condition) VALUES ($1, $2, $3, $4, $5, $6, $7)',
         [tail_code, name_plane, model, seats_count, flight_range_km, crew_num, plane_condition], (error, result) => {
          if (error) {
            throw error
          }
          res.status(200).json("Plane has been added!")
    });
        
},
    async getAllPlanes(req,res){
        pool.query('SELECT * FROM plane', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    },
    async getOnePlane(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM plane WHERE plane_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
    },
    async updatePlane(req,res){
        const id = parseInt(req.params.id)
        const { tail_code, name_plane, model, seats_count, flight_range_km, crew_num, plane_condition} = req.body
    pool.query(
      'UPDATE plane SET tail_code = $1, name_plane = $2, model = $3, seats_count = $4, flight_range_km = $5, crew_num = $6, plane_condition = $7 WHERE plane_id = $8',
      [tail_code, name_plane, model, seats_count, flight_range_km, crew_num, plane_condition, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Plane has been modified with ID: ${id}`)
      }
    )
    },
    async deletePlane(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM plane WHERE plane_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`Plane has been deleted with ID: ${id}`)
        })
    }
}

module.exports = PlaneController