const pool = require("../database/db")
const AviaCompanyController = {
    async createCompany(req,res){
        const { name_company, country_location } = req.body
  
        pool.query('INSERT INTO avia_company (name_company, country_location) VALUES ($1, $2)',
         [name_company, country_location], (error, result) => {
          if (error) {
            throw error
          }
          res.status(201).send(`Avia_company added with ID: ${result.insertId}`)
        })
    },
    async getAllCompany(req,res){
        pool.query('SELECT * FROM avia_company', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    },
    async getOneCompany(req,res){
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM avia_company WHERE avia_company_id = $1', [id], (error, results) => {
          if (error) {
            throw error
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
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
    },
    async deleteCompany(req,res){
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM avia_company WHERE avia_company_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`Deleted with ID: ${id}`)
        })
    }
}

module.exports = AviaCompanyController