const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ProjectHousingMarket',
    password: 'postgres',
    port: 5432,
})

const getRankings = (request, response) => {
    pool.query("SELECT state, overall_rank, quality_of_life, economy, infrastructure, tech_innovation, education, access_to_capital, cost_of_living, year, interest_rate, purchase_price FROM state_ranking", (error, results) => {
        if(error) {
            throw error
        }
        response.status(200)
        response.setHeader("Access-Control-Allow-Origin","*")
        response.json(results.rows)
    })
}

const getRankingsByState = (request, response) => {
    const state = request.params.state
    //console.log(state)
    pool.query("SELECT state, overall_rank, quality_of_life, economy, infrastructure, tech_innovation, education, access_to_capital, cost_of_living, year, interest_rate, purchase_price FROM state_ranking where year not in (2010, 2019) and state = $1", [state], (error, results) => {
        if(error) {
            console.log(error)
            throw error
        }
        response.status(200)
        response.setHeader("Access-Control-Allow-Origin","*")
        response.json(results.rows)
    })
}

const getPopulationByState = (request, response) => {
    const state = request.params.state
    //console.log(state)
    pool.query("select pop.state, pop.year, pop_estimate, pop_change, births, deaths, international_mig, domestic_mig, net_mig, interest_rate, purchase_price from population pop left join state_ranking sr on pop.state = sr.state and pop.year = sr.year where pop.year not in (2010, 2019) and pop.state = $1", [state], (error, results) => {
        if(error) {
            console.log(error)
            throw error
        }
        response.status(200)
        response.setHeader("Access-Control-Allow-Origin","*")
        response.json(results.rows)
    })
}


module.exports = {
    getRankings,
    getRankingsByState,
    getPopulationByState,
}