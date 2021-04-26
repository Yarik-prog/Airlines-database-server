const pool = require("../database/db")
const PassengerController = {
    async createPassenger(req,res){
        const { fullname_passenger, book_date, passport_number, phone_number, ticket_num, visa } = req.body
      
        pool.query('INSERT INTO passenger (fullname_passenger, book_date, passport_number, phone_number, ticket_num, visa) VALUES ($1, $2, $3, $4, $5, $6)',
         [fullname_passenger, book_date, passport_number, phone_number, ticket_num, visa ], (error, result) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json("Passenger has been added!")
    });
        
},
    async getAllPassengers(req,res){
        pool.query('SELECT * FROM passenger',[],(error, results) => {
            if (error) {
              //throw error
              return res.status(400).json({err:error.message})
            }
            res.status(200).json(results.rows)
          })
    },
    async getOnePassenger(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM passenger WHERE passenger_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json(results.rows)
        })
    },
    async updatePassengers(req,res){
        const id = parseInt(req.params.id)
        const { fullname_passenger, book_date, passport_number, phone_number, ticket_num, visa } = req.body
    pool.query(
      'UPDATE passenger SET fullname_passenger = $1, book_date = $2, passport_number = $3, phone_number = $4, ticket_num = $5, visa = $6 WHERE passenger_id = $7',
      [fullname_passenger, book_date, passport_number, phone_number, ticket_num, visa, id],
      (error, results) => {
        if (error) {
          //throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).send(`Passenger has been modified with ID: ${id}`)
      }
    )
    },
    async deletePassenger(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM passenger WHERE passenger_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).send({
              success:false,
              mes:error.message})
          }
          res.status(200).send(`Passenger has been deleted with ID: ${id}`)
        })
    },

    async getPassengerQuery(req,res){
      const { fullname_passenger, book_date} = req.body
      console.log(req.body)
      pool.query('SELECT *, to_char(book_date, $1) as book_date FROM passenger LEFT JOIN ticket ON passenger.passenger_id = ticket.passenger_id WHERE fullname_passenger = $2 AND to_char(book_date, $1) = $3', ['yyyy-MM-dd HH24:MI', fullname_passenger, book_date], (error, results) => {
        if (error) {
          //throw error
          return res.status(400).send({
            success:false,
            mes:error.message
          })
        }
        res.status(200).json(results.rows)
      })
  }

}

module.exports = PassengerController