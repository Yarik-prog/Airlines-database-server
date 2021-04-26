const pool = require("../database/db")
const AviaCompanyController = {
    async createCompany(req,res){
        const { name_company, country_location, address, phone_head_office} = req.body
       
        pool.query('INSERT INTO avia_company (name_company, country_location) VALUES ($1, $2) RETURNING *',
         [name_company, country_location], (error, result) => {
          if (error) {
           // throw error
           return res.status(400).json({err:error.message})
          }
          var company_id = result.rows[0].avia_company_id
         
          pool.query('INSERT INTO address_head_office (address, phone_head_office, avia_company_id) VALUES ($1, $2, $3) RETURNING *',
          [address, phone_head_office, company_id], (error, result) => {
           if (error) {
             //throw error
             return res.status(400).json({err:error.message})
           }
          res.status(200).json(result)
        });
    });
        
},
    async getAllCompany(req,res){
        pool.query('SELECT * FROM avia_company', (error, results) => {
            if (error) {
              //throw error
              return res.status(400).json({err:error.message})
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneCompany(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM avia_company WHERE avia_company_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).json(results.rows)
        })
    },
    async updateCompany(req,res){
        const id = parseInt(req.params.id)
        const { name_company, country_location } = req.body
    pool.query(
      'UPDATE avia_company SET name_company = $1, country_location = $2 WHERE avia_company_id = $3',
      [name_company, country_location, id],
      (error, results) => {
        if (error) {
          //throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
    },
    async deleteCompany(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM avia_company WHERE avia_company_id = $1', [id], (error, results) => {
          if (error) {
            //throw error
            return res.status(400).json({err:error.message})
          }
          res.status(200).send(`Deleted with ID: ${id}`)
        })
    },

    async getCompanyQuary(req,res){
      const { name_company, country_location} = req.body
      pool.query('SELECT * FROM avia_company INNER JOIN address_head_office ON avia_company.avia_company_id = address_head_office.avia_company_id WHERE name_company = $1 AND country_location = $2', [name_company, country_location], (error, results) => {
        if (error) {
         // throw error
          return res.status(400).json({err:error.message})
        }
        res.status(200).json(results.rows)
      })
  },

}

module.exports = AviaCompanyController