/*
  # Add sample products

  1. New Data
    - Adds sample products across different categories:
      - Pizzas
      - Burgers
      - Drinks
      - Desserts
    
  2. Notes
    - Each product includes:
      - Name
      - Description
      - Price
      - Category
      - Stock
      - Image URL (using Unsplash images)
*/

INSERT INTO products (name, description, price, category, stock, image_url) VALUES
-- Pizzas
('Margherita Pizza', 'Fresh tomatoes, mozzarella, basil, and olive oil', 14.99, 'Pizza', 50, 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca'),
('Pepperoni Pizza', 'Classic pepperoni with mozzarella and tomato sauce', 16.99, 'Pizza', 50, 'https://images.unsplash.com/photo-1628840042765-356cda07504e'),
('Vegetarian Pizza', 'Assorted fresh vegetables with mozzarella', 15.99, 'Pizza', 30, 'https://images.unsplash.com/photo-1571066811602-716837d681de'),

-- Burgers
('Classic Burger', 'Beef patty with lettuce, tomato, and special sauce', 12.99, 'Burgers', 40, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
('Cheese Burger', 'Classic burger with melted cheddar cheese', 13.99, 'Burgers', 40, 'https://images.unsplash.com/photo-1550317138-10000687a72b'),
('Veggie Burger', 'Plant-based patty with fresh vegetables', 11.99, 'Burgers', 25, 'https://images.unsplash.com/photo-1520072959219-c595dc870360'),

-- Drinks
('Cola', 'Classic carbonated cola drink', 2.99, 'Drinks', 100, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97'),
('Iced Tea', 'Fresh brewed tea with ice', 2.99, 'Drinks', 100, 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87'),
('Fresh Lemonade', 'Freshly squeezed lemons with mint', 3.99, 'Drinks', 50, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859'),

-- Desserts
('Chocolate Cake', 'Rich chocolate layer cake with ganache', 6.99, 'Desserts', 20, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587'),
('Cheesecake', 'New York style cheesecake with berry compote', 7.99, 'Desserts', 15, 'https://images.unsplash.com/photo-1524351199678-941a58a3df50'),
('Ice Cream Sundae', 'Vanilla ice cream with chocolate sauce and nuts', 5.99, 'Desserts', 30, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb');