const pool = require("../database/db")
const RouteController = {
    async createRoute(req,res){
        const { dep_airport, arrive_airport, dep_country, arrive_country, route_status} = req.body
    
        pool.query('INSERT INTO route (dep_airport, arrive_airport, dep_country, arrive_country, route_status) VALUES ($1, $2, $3, $4, $5)',
         [dep_airport, arrive_airport, dep_country, arrive_country, route_status ], (error, result) => {
          if (error) {
            throw error
          }
          res.status(200).json("Route has been added!")
    });
        
},
    async getAllRoutes(req,res){
        pool.query('SELECT * FROM route', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneRoute(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM route WHERE route_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
    },
    async updateRoute(req,res){
        const id = parseInt(req.params.id)
        const { dep_airport, arrive_airport, dep_country, arrive_country, route_status} = req.body
    pool.query(
      'UPDATE route SET dep_airport = $1, arrive_airport = $2, dep_country = $3, arrive_country = $4, route_status = $5 WHERE route_id = $6',
      [dep_airport, arrive_airport, dep_country, arrive_country, route_status, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Route has been modified with ID: ${id}`)
      }
    )
    },
    async deleteRoute(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM route WHERE route_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`Route has been deleted with ID: ${id}`)
        })
    }
}

module.exports = RouteController