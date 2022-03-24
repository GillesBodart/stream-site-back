var express = require("express")
var port = 5050

app = express()


app.get("/blabla", function (req,res){
  res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
