const db = require("./db");

async function initTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        token VARCHAR(64) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        link_id INTEGER NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_locations_link
          FOREIGN KEY (link_id)
          REFERENCES links(id)
          ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_links_token
        ON links(token);
      
      CREATE INDEX IF NOT EXISTS idx_locations_link_id
        ON locations(link_id);
      
      CREATE INDEX IF NOT EXISTS idx_locations_created_at
        ON locations(created_at);
    `);

    console.log("Tables created successfully");
    process.exit(0);
  } catch (err) {
    console.error("DB init error:", err);
    process.exit(1);
  }
}

initTables();