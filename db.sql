CREATE TABLE creator_profiles (
  id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,

  full_name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,

  email VARCHAR(255),
  govt_id_url TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  CONSTRAINT fk_creator_profiles_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
