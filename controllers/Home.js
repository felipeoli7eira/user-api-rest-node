class Home
{

    async index(req, res)
    {
        res.json(
            {
                message: "Welcome! to use this app, open an http client and send requests to the endpoints listed in the endpoints key",
                endpoints: [
                    {
                        "verb": "GET",
                        "route": "/users"
                    },

                    {
                        "verb": "POST",
                        "route": "/users",
                        "body": ["name", "email", "password", "role"]
                    },

                    {
                        "verb": "GET",
                        "route": "/user/:id"
                    },

                    {
                        "verb": "PUT",
                        "route": "/user",
                        "body": ["name", "email", "role"]
                    },

                    {
                        "verb": "DELETE",
                        "route": "/user/:id"
                    }
                ]
            }
        )
    }

}

module.exports = new Home()