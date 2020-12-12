const UserModel = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = 'qazwsxedcrfvtgbyhnujm12345678901920192298329388437834747657465'

class User
{
    async index(req, res)
    {
        let process = await UserModel.all()

        res.statusCode = process.sttscode

        res.json( process )
    }

    async getByID(req, res)
    {
        let process = await UserModel.findByID(req.params.id)

        res.statusCode = process.sttscode

        res.json( process )
    }

    async create(req, res)
    {
        const process = await UserModel.create(req.body)

        res.statusCode = process.sttscode

        res.json( process )
    }

    async findUserByEmail()
    {

    }

    async update(req, res)
    {
        let process = await UserModel.update(req.body)

        res.statusCode = process.sttscode

        res.json( process )
    }

    async delete(req, res)
    {
        let process = await UserModel.delete(req.params.id)

        res.statusCode = process.sttscode
        
        res.json( process )
    }

    async login(req, res)
    {
        const {email, password} = req.body

        if (!email || !password)
        {
            const sttscode = 401
            res.statusCode = sttscode

            res.json(
                {
                    error: true,
                    data: null,
                    sttscode,
                    message: 'E-mail e senha devem ser informados para a realização do login'
                }
            )

            return false
        }

        let process = await UserModel.getByEmail( req.body.email )

        if (!process.error)
        {
            if (process.data.length)
            {
                if (bcrypt.compare( req.body.password, process.data[ 0 ].password ))
                {
                    const token = await jwt.sign(
                        {
                            uid: process.data[ 0 ].id,
                        },
                        secret,
                        {
                            expiresIn: 60 * 60
                        }
                    )

                    res.statusCode = 200

                    res.json (
                        {
                            error: false,
                            sttscode: 200,
                            data: {
                                uid: process.data[ 0 ].id,
                                token
                            },
                            message: 'authorized'
                        }
                    )

                    return true
                }
                
                res.statusCode = 401
                res.json(
                    {
                        error: true,
                        sttscode: 401,
                        data: null,
                        message: 'Autenticação inválida'
                    }
                )

                return false
            }

            res.statusCode = 401
            res.json(
                {
                    error: true,
                    sttscode: 401,
                    data: null,
                    message: 'Não encontrado'
                }
            )

            return false
        }
    }

    async logout(req, res)
    {

    }
}

module.exports = new User()