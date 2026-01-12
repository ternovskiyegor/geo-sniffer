const db = require("../config/db");

async function saveLocationByToken(token, lat, lng) {
    const query = `
    INSERT INTO locations (link_id, latitude, longitude)
    SELECT id, $2, $3
        FROM links
        WHERE token = $1
        RETURNING id; 
    `;

    const result = await db.query(query, [token, lat, lng]);

    if (result.rowCount === 0) {
        throw new Error("Invalid token");
    }

    return result.rows[0].id;
}

module.exports = {
    saveLocationByToken
}