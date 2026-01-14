/*
  # Restaurant POS System Schema

  1. New Tables
    - `users` - Store user information and roles
      - `id` (uuid, primary key)
      - `email` (text)
      - `role` (text)
      - `location_id` (uuid)
      - `created_at` (timestamp)
    
    - `locations` - Store restaurant locations
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `created_at` (timestamp)
    
    - `products` - Store menu items/products
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `category` (text)
      - `image_url` (text)
      - `stock` (integer)
      - `location_id` (uuid)
      - `created_at` (timestamp)
    
    - `orders` - Store orders
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `location_id` (uuid)
      - `status` (text)
      - `total_amount` (decimal)
      - `payment_method` (text)
      - `created_at` (timestamp)
    
    - `order_items` - Store order items
      - `id` (uuid, primary key)
      - `order_id` (uuid)
      - `product_id` (uuid)
      - `quantity` (integer)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `members` - Store membership information
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `tier` (text)
      - `points` (integer)
      - `created_at` (timestamp)
    
    - `coupons` - Store coupon information
      - `id` (uuid, primary key)
      - `code` (text)
      - `discount_percent` (integer)
      - `valid_from` (timestamp)
      - `valid_until` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on their roles and locations
*/

-- Create tables
CREATE TABLE locations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    address text NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    role text NOT NULL DEFAULT 'staff',
    location_id uuid REFERENCES locations(id),
    created_at timestamptz DEFAULT now()
);

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price decimal NOT NULL,
    category text NOT NULL,
    image_url text,
    stock integer NOT NULL DEFAULT 0,
    location_id uuid REFERENCES locations(id),
    created_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id),
    location_id uuid REFERENCES locations(id),
    status text NOT NULL DEFAULT 'pending',
    total_amount decimal NOT NULL,
    payment_method text NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders(id),
    product_id uuid REFERENCES products(id),
    quantity integer NOT NULL,
    price decimal NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id),
    tier text NOT NULL DEFAULT 'bronze',
    points integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE coupons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text UNIQUE NOT NULL,
    discount_percent integer NOT NULL,
    valid_from timestamptz NOT NULL,
    valid_until timestamptz NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their location" ON locations
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR EXISTS (
        SELECT 1 FROM users WHERE users.location_id = locations.id AND users.id = auth.uid()
    ));

CREATE POLICY "Staff can view products at their location" ON products
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.location_id = products.location_id
    ));

CREATE POLICY "Staff can create orders" ON orders
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.location_id = orders.location_id
    ));

CREATE POLICY "Staff can view orders at their location" ON orders
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.location_id = orders.location_id
    ));