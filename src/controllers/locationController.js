const { saveLocationByToken } = require("../services/locationService");

function isValidCoordinates(lat, lng) {
    return (
        typeof lat === "number" &&
        typeof lng === "number"
    );
}

exports.saveLocation = async (req, res) => {
    try {
        const { token, lat, lng } = req.body;

        if (!token) {
            return res.status(400).json({ error: "Некоректний токен "});
        }

        if (!isValidCoordinates(lat, lng)) {
            return res.status(400).json({ error: "Некоректні координати "});
        }

        const id = await saveLocationByToken(token, lat, lng);

        res.json( {status: "ok", id });
    } catch(err) {
        res.status(500).json({ error: "DB error" });
    }
}