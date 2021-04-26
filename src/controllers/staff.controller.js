const pool = require("../database/db")
const StaffController = {
    async createStaff(req,res){
        const { fullname_staff, work_position, flight_hours, crew_num} = req.body
      
        pool.query('INSERT INTO staff (fullname_staff, work_position, flight_hours, crew_num) VALUES ($1, $2, $3, $4)',
         [fullname_staff, work_position, flight_hours, crew_num ], (error, result) => {
          if (error) {
           // throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json("Staff has been added!")
    });
        
},
    async getAllStaff(req,res){
        pool.query('SELECT * FROM staff', (error, results) => {
            if (error) {
             // throw error
             return res.status(400).json({err:error.message})
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneStaff(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM staff WHERE staff_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json(results.rows)
        })
    },
    async updateStaff(req,res){
        const id = parseInt(req.params.id)
        const { fullname_staff, work_position, flight_hours, crew_num} = req.body
    pool.query(
      'UPDATE staff SET fullname_staff = $1, work_position = $2, flight_hours = $3, crew_num = $4 WHERE staff_id = $5',
      [fullname_staff, work_position, flight_hours, crew_num, id],
      (error, results) => {
        if (error) {
         //throw error
         return res.status(400).json({err:error.message})
        }
        res.status(200).send(`Staff has been modified with ID: ${id}`)
      }
    )
    },
    async deleteStaff(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM staff WHERE staff_id = $1', [id], (error, results) => {
          if (error) {
           // throw error
           return res.status(400).json({err:error.message})
          }
          res.status(200).send(`Staff has been deleted with ID: ${id}`)
        })
    },

    async getStaffQuary(req,res){
      const {work_position, crew_num} = req.body
      pool.query('SELECT * FROM staff LEFT JOIN crew ON staff.crew_num = crew.crew_id WHERE work_position = $1 AND staff.crew_num = $2 ', [work_position, crew_num], (error, results) => {
        if (error) {
          //throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).json(results.rows)
      })
  }
}

module.exports = StaffController