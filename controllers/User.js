class User
{
    async store(req, res)
    {
        res.json( req.body )
        console.log(req.body)
    }
}

module.exports = new User()