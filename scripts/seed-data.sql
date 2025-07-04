-- Seed initial data for PhoneGuard

-- Insert admin user (password: 'password')
INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES 
(1, 'Admin User', 'admin@phoneguard.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample regular user (password: 'password')
INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES 
(2, 'John Doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Insert sample submissions
INSERT OR IGNORE INTO submissions (user_id, name, phone_number, message, category, status) VALUES 
(2, 'John Doe', '(555) 123-4567', 'Called claiming to be from IRS, demanding immediate payment via gift cards. Very aggressive and threatening.', 'scam', 'approved'),
(2, 'John Doe', '(555) 987-6543', 'Robocall about car warranty extension. Called multiple times despite being on do-not-call list.', 'spam', 'approved'),
(2, 'John Doe', '(555) 456-7890', 'Telemarketing call for solar panels. Persistent and would not take no for an answer.', 'telemarketing', 'pending'),
(2, 'John Doe', '(555) 321-0987', 'Fake tech support claiming my computer was infected. Wanted remote access.', 'scam', 'approved'),
(2, 'John Doe', '(555) 654-3210', 'Spam call about health insurance. Automated message.', 'spam', 'rejected'),
(2, 'John Doe', '(555) 789-0123', 'Fraudulent call claiming I won a lottery I never entered. Asked for personal information.', 'fraud', 'approved');

-- Insert sample contact messages
INSERT OR IGNORE INTO contact_messages (name, email, subject, message) VALUES 
('Jane Smith', 'jane@example.com', 'Feature Request', 'Would love to see a mobile app for easier reporting on the go.'),
('Bob Johnson', 'bob@example.com', 'Bug Report', 'Having trouble with the search function on mobile devices.'),
('Alice Brown', 'alice@example.com', 'General Inquiry', 'How can I become a moderator to help verify reports?');
