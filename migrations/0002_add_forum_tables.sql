-- Forum categories table
CREATE TABLE IF NOT EXISTS forum_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category_type TEXT NOT NULL, -- public, members
  sort_order INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Forum topics table
CREATE TABLE IF NOT EXISTS forum_topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  pinned INTEGER DEFAULT 0,
  locked INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  last_reply_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES forum_categories(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Forum posts/replies table
CREATE TABLE IF NOT EXISTS forum_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  edited INTEGER DEFAULT 0,
  edited_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES forum_topics(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_forum_topics_category ON forum_topics(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_topics_user ON forum_topics(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_topic ON forum_posts(topic_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_user ON forum_posts(user_id);

-- Insert default forum categories
INSERT INTO forum_categories (name, description, category_type, sort_order) VALUES 
  ('General Discussion', 'General topics about Croatia Cleveland FC', 'public', 1),
  ('Game Day Talk', 'Discuss upcoming games and recent matches', 'public', 2),
  ('Croatian Heritage', 'Croatian culture, traditions, and community', 'public', 3),
  ('Member Announcements', 'Official announcements for members only', 'members', 1),
  ('Member Discussion', 'Private discussion area for active members', 'members', 2),
  ('Club Business', 'Club matters for members in good standing', 'members', 3);
