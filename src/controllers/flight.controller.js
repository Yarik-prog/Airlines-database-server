const pool = require("../database/db")
const FlightController = {
    async createFlight(req,res){
        const { flight_num, dep_date, route_id, tail_code, add_luggage, terminal, runaway, flight_status} = req.body
       
        pool.query('INSERT INTO flight (flight_num, dep_date, route_id, tail_code, add_luggage, terminal, runaway, flight_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
         [flight_num, dep_date, route_id, tail_code, add_luggage, terminal, runaway, flight_status], (error, result) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).send(`Flight has been added`)
    });
        
},
    async getAllFlights(req,res){
        pool.query('SELECT * FROM flight',[],(error, results) => {
            if (error) {
              //throw error
              return res.status(400).json({err:error.message})
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneFlight(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM flight WHERE flight_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json(results.rows)
        })
    },
    async updateFlight(req,res){
        const id = parseInt(req.params.id)
        const { flight_num, dep_date, route_id, tail_code, add_luggage, terminal, runaway, flight_status} = req.body
    pool.query(
      'UPDATE flight SET flight_num = $1, dep_date = $2, route_id = $3, tail_code = $4, add_luggage = $5, terminal = $6, runaway = $7, flight_status = $8  WHERE flight_id = $9',
      [flight_num, dep_date, route_id, tail_code, add_luggage, terminal, runaway, flight_status, id],
      (error, results) => {
        if (error) {
          //throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).send(`Flight has been modified with ID: ${id}`)
      }
    )
    },
    async deleteFlight(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM flight WHERE flight_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).send({
              success:false,
              mes:error.message
            })
          }
          res.status(200).send(`Flight has been deleted with ID: ${id}`)
        })
    },
    async getFlightsQuary(req,res){
      const { search_date, terminal} = req.body
  
      pool.query('SELECT *, to_char(dep_date, $1) as dep_date FROM flight '
      +'LEFT JOIN route ON flight.route_id = route.route_id '
      +'WHERE to_char(dep_date, $1) = $2 AND terminal = $3 ', ['yyyy-MM-dd HH24:MI', search_date, terminal], (error, results) => {
        if (error) {
          //throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).json(results.rows)
      })
  },

  async testQuary(req,res){
    const { country_location, dep_airport} = req.body
console.log(req.body)
    pool.query('SELECT * FROM flight '
    +'LEFT JOIN route ON flight.route_id = route.route_id '
    +'LEFT JOIN tail_number ON flight.tail_code = tail_number.tail_code '
    +'LEFT JOIN avia_company ON tail_number.avia_company_id = avia_company.avia_company_id '
    +'LEFT JOIN address_head_office ON tail_number.avia_company_id =  address_head_office.avia_company_id '
    +'WHERE route.dep_airport = $1 AND avia_company.country_location = $2 ', [dep_airport, country_location], (error, results) => {
      if (error) {
        //throw error
        return res.status(400).json({err:error.message})
      }
      console.log(results.rows)
        res.status(200).json(results.rows)
      })
}
}

module.exports = FlightController