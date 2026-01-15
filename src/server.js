require("dotenv").config();
const app = require("./app");

require("./config/db");
const initTables = require("./config/initTables");

const PORT = process.env.PORT || 3000;

{async () => {
    try {
        await initTables();
        app.listen(PORT, () => {
            console.log("Server started");
        })
    } catch (err) {
        console.error("DB init failed", err);
        process.exit(1);
    }
}}
