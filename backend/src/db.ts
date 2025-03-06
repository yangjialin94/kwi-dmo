import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Determine the database path based on the environment
const DB_PATH = process.env.DOCKER_ENV === "true" ? "/app/database.sqlite" : "./database.sqlite";

// Initialize the database
export const initializeDB = async () => {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  // Recreate tables
  await db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    
    CREATE TABLE products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      discount INTEGER DEFAULT 0,
      image TEXT
    );
    
    CREATE TABLE cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      discount INTEGER DEFAULT 0,
      image TEXT,
      quantity INTEGER DEFAULT 1,
      subtotal REAL DEFAULT 0,
      savings REAL DEFAULT 0,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  // Load sample data
  await db.exec(`
    INSERT INTO products (id, name, price, discount, image) VALUES
    ('000000000001', 'iPhone 15 Pro', 999.99, 50, '/images/iphone15pro.jpg'),
    ('000000000002', 'MacBook Pro 16', 2499.99, 100, '/images/macbookpro.jpg'),
    ('000000000003', 'iPad Pro 12.9', 1099.99, 0, '/images/ipadpro.jpg'),
    ('000000000004', 'Apple Watch Ultra', 799.99, 50, '/images/applewatch.jpg'),
    ('000000000005', 'AirPods Pro 2', 249.99, 20, '/images/airpods.jpg');
  `);

  return db;
};
