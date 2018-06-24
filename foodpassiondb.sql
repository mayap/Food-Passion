--
-- File generated with SQLiteStudio v3.1.1 on Sun Jun 24 22:01:32 2018
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Category
CREATE TABLE Category (id INTEGER PRIMARY KEY, category_name STRING, parent_id INTEGER);

-- Table: Category_Recipe
CREATE TABLE Category_Recipe (id INTEGER PRIMARY KEY, category_id INTEGER, recipe_id INTEGER);

-- Table: Comment
CREATE TABLE Comment (id INTEGER PRIMARY KEY, comment_text TEXT, user_id INTEGER);

-- Table: Recipe
CREATE TABLE Recipe (id INTEGER PRIMARY KEY, recipe_name STRING, preparation_time INTEGER, image STRING, calories INTEGER, is_public BOOLEAN, is_active BOOLEAN, ingredients TEXT, preparation_steps TEXT);

-- Table: User
CREATE TABLE User (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name STRING, last_name STRING, email STRING, password STRING);

-- Table: User_Recipe
CREATE TABLE User_Recipe (id INTEGER PRIMARY KEY, user_id INTEGER, recipe_id INTEGER);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
