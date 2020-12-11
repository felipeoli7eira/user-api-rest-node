const express = require('express')
const appRoutes = require('./routes/routes')

const app = express()

app.use(express.json())
app.use(
    express.urlencoded(
        {
            extended: false
        }
    )
)

app.use('/', appRoutes)

app.listen(8080, () => console.log('running'))
