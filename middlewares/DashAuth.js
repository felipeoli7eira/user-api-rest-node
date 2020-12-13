const jwt = require('jsonwebtoken')
const secret = 'qazwsxedcrfvtgbyhnujm12345678901920192298329388437834747657465'

const Database = require('./../database/connection')

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader)
    {
        res.statusCode = 401
        res.json(
            {
                sttscode: 401,
                data: null,
                message: 'Não autorizado',
                error: true
            }
        )
        return false
    }

    const token = authorizationHeader.split(' ') [ 1 ]

    const jwtDecode = jwt.verify(token, secret, (error, token) => {

        if(error)
        {
            res.statusCode = 400
            res.json(
                {
                    error: true,
                    data: null,
                    message: 'invalidToken: ' + error,
                    sttscode: 400
                }
            )

            return false
        }

        return token
    })

    Database.select(['id', 'name', 'email', 'role']).table('users').where( { id: jwtDecode.uid } )
    .then(result => {

        if (result.length)
        {
            res.statusCode = 200
            res.json(
                {
                    sessName: 'authorized',
                    data: result,
                    token
                }
            )

            // next()

            return true
        }

        res.statusCode = 302
        res.redirect('/')

        return false

    }).catch(error => {

        res.statusCode = 500
        res.json(
            {
                error: true,
                data: null,
                message: 'catchError: ' + error,
                sttscode: 500
            }
        )

        return false
    })
}