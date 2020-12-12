const UserModel = require('./../models/User')

class User
{
    async store(req, res)
    {
        const response = await UserModel.store(req.body)

        if(response)
        {
            res.statuscode = 201
            res.send(
                {
                    success: true,
                    code: 201,
                    data: null,
                    message: 'created'
                }
            )

            return true
        }

        res.statuscode = 500
        res.send(
            {
                success: false,
                code: 500,
                data: null,
                message: 'serverError'
            }
        )

        return false
    }
}

module.exports = new User()