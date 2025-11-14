CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_name VARCHAR(120) NOT NULL,
  project_title VARCHAR(150),
  description TEXT,
  status VARCHAR(50),
  started_date DATE,
  completed_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO portfolio (owner_name, project_title, description, status, started_date, completed_date)
VALUES
('Omega Mulafu','Website Redesign','Redesign of main website','In Progress','2025-09-01',NULL),
('Steven Musonda','Mobile App','Development of mobile app','Completed','2024-01-15','2024-12-20'),
('Choolwe Chuma','API Integration','Integrate third-party API','Planned','2025-11-01',NULL),
('Lewis Nalubamba','Database Migration','Migrate legacy DB','In Progress','2025-08-10',NULL),
('Mwila Nkonge','Marketing Campaign','Launch marketing campaign','Completed','2023-05-05','2023-09-30'),
('Manasseh Hanzala','Ecommerce Platform','Build ecommerce platform','Planned','2025-12-01',NULL),
('Choolwe Chuma','SEO Optimization','Optimize SEO for site','Completed','2024-03-10','2024-07-15'),
('Chabota Chuma','Cloud Deployment','Deploy to cloud','In Progress','2025-06-20',NULL),
('Josphat Matanda','Data Analytics Dashboard','Build analytics dashboard','Planned','2025-10-10',NULL),
('Belvis Mulamfu','UX Research','Conduct UX research study','Completed','2023-11-01','2024-02-28');
