const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const numCPUs = os.cpus().length;
const cors = require('cors');
const routes = require("./routes")
const morgan = require('morgan'); 


//At first check the cpu lenght and  fork the cluster
if (cluster.isMaster){
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
}
else{

//create the express app
const app = express();    
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();




//api request monitoring
app.use(morgan('dev'));

//URL Setup 
const apiBaseUrl = `/revestsolutions-backend/api/v1/`;

//Routes 

// homepage Check 
// app.use(`${apiBaseUrl}`, (req, res) => {
//     res.send(' Revest  Application  is running good');
//   });

app.use(`${apiBaseUrl}`, routes);


    

const PORT = process.env.PORT ||5700;
app.listen(PORT, () => {
// console.log(`server  ${process.pid} is running on port ${PORT}`);
});



}


