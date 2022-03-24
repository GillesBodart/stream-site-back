var express = require("express")
var port = process.env.PORT | 3000

app = express()


app.get("/", function (req, res) {
    res.send("root")
})

app.get("/blabla", function (req, res) {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Live Backend app listening on port ${port}`)
})
