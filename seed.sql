-- Insert sample teams
INSERT OR IGNORE INTO teams (id, name, division, description) VALUES 
  (1, 'Majors (Men''s 1st Division)', 'NPSL Great Lakes East', 'First division competitive men''s team'),
  (2, 'Reserves', 'Regional Division 2', 'Men''s reserve team'),
  (3, 'Oluja', 'Amateur Division', 'Competitive amateur team'),
  (4, 'Lučko', 'Recreational Division', 'Recreational team');

-- Insert sample admin user (password: admin123)
INSERT OR IGNORE INTO users (id, email, password_hash, first_name, last_name, role) VALUES 
  (1, 'admin@croatiacleveland.com', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'Admin', 'User', 'admin');

-- Insert sample news updates
INSERT OR IGNORE INTO news (title, content, category, priority, active) VALUES 
  ('Majors Win 3-1 Against FC Detroit!', 'Great victory for our first division team with goals from Marković, Kovač, and Petrović.', 'game_result', 1, 1),
  ('Croatia Park Construction 60% Complete', 'New field facility progressing on schedule. Expected completion Spring 2026.', 'club_event', 2, 1),
  ('Player Spotlight: Tomo Maric and Ivi Medukic Named Co-MVPs', 'Congratulations to Ivan Kovač for outstanding performance this season.', 'player_highlight', 1, 1);

-- Insert sample products
INSERT OR IGNORE INTO products (name, description, price, category, stock_quantity) VALUES 
  ('Official Home Jersey 2024', 'Official Croatia Cleveland home jersey with club crest', 65.00, 'jersey', 50),
  ('Away Jersey 2024', 'Official away jersey in Croatian colors', 65.00, 'jersey', 40),
  ('Club Scarf', 'Croatia Cleveland supporter scarf', 20.00, 'accessories', 100),
  ('Training T-Shirt', 'Official training gear', 25.00, 'apparel', 75);

-- Insert sample events
INSERT OR IGNORE INTO events (title, description, event_date, location, ticket_price, max_tickets) VALUES 
  ('Annual Tamburitza Night', 'Traditional Croatian music and dance celebration', '2026-03-15 19:00:00', 'American Croatian Lodge', 25.00, 200),
  ('Youth Soccer Camp', 'Summer soccer training camp for ages 8-16', '2026-06-20 09:00:00', 'Croatia Cleveland Stadium', 150.00, 50);

-- Insert sample games
INSERT OR IGNORE INTO games (team_id, opponent, game_date, location, home_away, status) VALUES 
  (1, 'AFC Cleveland', '2026-03-08 14:00:00', 'Croatia Cleveland Stadium', 'home', 'scheduled'),
  (1, 'Detroit City FC', '2026-03-15 15:00:00', 'Keyworth Stadium', 'away', 'scheduled'),
  (2, 'Cleveland SC Reserves', '2026-03-10 12:00:00', 'Croatia Cleveland Stadium', 'home', 'scheduled');

-- Insert sample Croatia Park update
INSERT OR IGNORE INTO croatia_park_updates (title, content, progress_percentage) VALUES 
  ('Foundation Complete!', 'The foundation and drainage system for the new field has been completed. Next phase: field surface installation.', 60);
