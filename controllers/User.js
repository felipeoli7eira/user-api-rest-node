const UserModel = require('./../models/User')

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
}

module.exports = new User()