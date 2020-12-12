const UserModel = require('./../models/User')

class User
{
    async index(req, res)
    {
        let process = await UserModel.all()

        res.statusCode = proccess.sttscode

        res.json({process})
    }

    async getByID(req, res)
    {
        let proccess = await UserModel.findByID(req.params.id)

        res.statusCode = proccess.sttscode

        res.json(
            {
                proccess
            }
        )
    }

    async create(req, res)
    {
        const proccess = await UserModel.create(req.body)

        res.statusCode = proccess.sttscode

        res.json(
            {
                proccess
            }
        )
    }

    async findUserByEmail()
    {

    }

    async update(req, res)
    {
        let proccess = await UserModel.update(req.body)

        res.statusCode = proccess.sttscode

        res.json(
            {
                proccess
            }
        )
    }
}

module.exports = new User()