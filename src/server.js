require("dotenv").config();
const app = require("./app");

require("./config/db");
const initTables = require("./config/initTables");

(async () => {
    try {
        await initTables();
    } catch (err) {
        console.error("DB init failed", err);
    }
})();

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
