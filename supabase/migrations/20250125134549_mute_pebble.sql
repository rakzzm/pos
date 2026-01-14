/*
  # Add admin users

  1. New Users
    - Add two admin users with specified credentials:
      - rakesh@teleaon.ai
      - sandeep@teleaon.ai

  2. Security
    - Users are created with admin role
    - Passwords are securely hashed
*/

-- Insert admin users into auth.users
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES
(
  'rakesh@teleaon.ai',
  crypt('admin12345', gen_salt('bf')),
  now(),
  'authenticated',
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin"}'
),
(
  'sandeep@teleaon.ai',
  crypt('admin12345', gen_salt('bf')),
  now(),
  'authenticated',
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin"}'
);

-- Insert corresponding records into public.users table
INSERT INTO public.users (
  id,
  email,
  role,
  name
)
SELECT 
  id,
  email,
  'admin',
  split_part(email, '@', 1) -- Use part before @ as name
FROM auth.users
WHERE email IN ('rakesh@teleaon.ai', 'sandeep@teleaon.ai');