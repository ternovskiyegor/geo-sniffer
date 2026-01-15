require("dotenv").config();
const app = require("./app");

require("./config/db");
const initTables = require("./config/initTables");

{async () => {
    try {
        await initTables();
        app.listen(process.env.PORT, () => {
            console.log("Server started");
        })
    } catch (err) {
        console.error("DB init failed", err);
        process.exit(1);
    }
}}
