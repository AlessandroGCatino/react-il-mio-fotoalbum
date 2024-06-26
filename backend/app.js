const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const PhotoRouter = require('./routers/PhotoRouter')
const CategoryRouter = require('./routers/CategoryRouter')
const routerAuth = require('./routers/routerAuth')
const missingPage = require('./middlewares/missingPage')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors');


app.use(cors())
app.use(express.json())

app.use("/auth", routerAuth)
app.use("/photoes", PhotoRouter)
app.use("/categories", CategoryRouter)

app.use(missingPage)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})