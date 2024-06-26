const verifyID = {
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "ID deve essere un intero"
        },
        toInt: true
    }
}

module.exports = {verifyID};