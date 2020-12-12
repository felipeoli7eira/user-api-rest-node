class Home
{

    async index(req, res)
    {
        res.json(
            {
                message: "Welcome! to use this application, open an http client and send requests to the endpoints listed in the endpoints key",
                endpoints: [
                    {
                        "verb": "GET",
                        "route": "/users"
                    }
                ]
            }
        )
    }

}

module.exports = new Home()