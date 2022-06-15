require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mainRouter = require("./src/routes");
const db = require("./src/config/db");
// const mainRouter = require("./src/routes");

// create express application
const server = express();
const PORT = process.env.PORT || 8000;

// jika db berhasil connect maka kita jalankan servernya
db.connect()
    .then(() => {
        console.log("DB Connected");
        // pasang middleware global
        // logger
        // if (process.env.NODE_END !== "production"){
        //     const logger = require("morgan");
        //     server.use(
        //         logger(":method :url :status :res[content-length] - :response-time ms")
        //     );
        // }
        // handler/middleware untuk body berbentuk form urlencoded
        server.use(express.urlencoded({ extended: false }));
        // handler/middleware untuk body berbentuk raw json
        //server.use(express.json());

        // pasang cors
        const corsOptions = {
            //origin: '*',
            origin: ["*","http://localhost:3001","http://localhost:3000"],
            methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        };
        server.use(cors(corsOptions));
        // server.options("*", cors(corsOptions));

        server.use(express.static("public"));
        // pasang router ke server
        server.use(mainRouter);
        
        // run server at port
        server.listen(PORT, () => {
            console.log(`Server is Running at PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });