class Dashboard
{
    async index(req, res)
    {
        res.json(
            {
                ex: true
            }
        )
    }
}

module.exports = new Dashboard()