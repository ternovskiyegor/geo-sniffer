const pool = require("../config/db");

exports.create = async (token) => {
    const result = await pool.query(
        "INSERT INTO links (token) VALUES ($1) RETURNING id, token",
        [token]
    );
    return result.rows[0];
};

exports.findByToken = async (token) => {
    const result = await pool.query(
        "SELECT * FROM links WHERE token = $1",
        [token]
    );

    return result.rows[0];
}