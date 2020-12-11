class Home
{

    async index(req, res)
    {
        res.send('welcome')
    }

}

module.exports = new Home()