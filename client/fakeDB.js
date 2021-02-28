const history = []

const CAPACITY = 10

const getHistory = () => history

const addCalculation = (result) => {
    // if history is full, remove olded calculation
    if (history.length === CAPACITY) {
        history.pop()
    }
    history.unshift(result)
}

module.exports = {
    getHistory, 
    addCalculation
}