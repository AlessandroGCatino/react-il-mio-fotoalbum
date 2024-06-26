const verifyRequest = {
    title: {
        notEmpty: {
            errorMessage: 'Inserisci il nome della categoria',
            bail: true
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'Il nome deve essere lungo almeno 3 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Il nome deve essere una stringa'
        }
    }
}

module.exports = { verifyRequest };

