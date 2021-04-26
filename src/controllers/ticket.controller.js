const pool = require("../database/db")
const TicketController = {
    async createTicket(req,res){
        const { ticket_num, seat_num, cost_ua, type_class, ticket_status, route_id ,passenger_id } = req.body
      
       
        pool.query('INSERT INTO ticket (ticket_num, seat_num, cost_ua, type_class, ticket_status, route_id ,passenger_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
         [ticket_num, seat_num, cost_ua, type_class, ticket_status, route_id ,passenger_id ], (error, result) => {
          if (error) {
            //throw error
          return res.status(400).json({err:error.message})
          }
          res.status(200).json("Ticket has been added!")
    });
        
},
    async getAllTickets(req,res){
        pool.query('SELECT * FROM ticket', (error, results) => {
            if (error) {
              //throw error
              return res.status(400).json({err:error.message})
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneTicket(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM ticket WHERE ticket_id = $1', [id], (error, results) => {
          if (error) {
           // throw error
           return res.status(400).json({err:error.message})
          }
          res.status(200).json(results.rows)
        })
    },
    async updateTicket(req,res){
        const id = parseInt(req.params.id)
        const { ticket_num, seat_num, cost_ua, type_class, ticket_status, route_id, passenger_id } = req.body
    pool.query(
      'UPDATE ticket SET ticket_num = $1, seat_num = $2, cost_ua = $3,  type_class = $4, ticket_status = $5, route_id = $6 ,passenger_id = $7 WHERE ticket_id = $8',
      [ticket_num, seat_num, cost_ua, type_class, ticket_status, route_id ,passenger_id, id],
      (error, results) => {
        if (error) {
          //throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).send(`Ticket has been modified with ID: ${id}`)
      }
    )
    },
    async deleteTicket(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM ticket WHERE ticket_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).send(`Ticket has been deleted with ID: ${id}`)
        })
    },

    async getTicketsQuery(req,res){
      const { ticket_num, route_id} = req.body
      pool.query('SELECT * FROM ticket ' +
      'LEFT JOIN transfer ON ticket.ticket_id = transfer.ticket_id '+
      'LEFT JOIN (SELECT flight_id, route_id, flight_num, dep_date FROM flight) AS flight ON transfer.flight_id = flight.flight_id '+
      'LEFT JOIN (SELECT * FROM route) AS route ON flight.route_id = route.route_id WHERE ticket_num = $1 AND ticket.route_id = $2', [ticket_num, route_id], (error, results) => {
        if (error) {
         //throw error
         return res.status(400).json({err:error.message})
        }
        res.status(200).json(results.rows)
      })
  }
}

module.exports = TicketController