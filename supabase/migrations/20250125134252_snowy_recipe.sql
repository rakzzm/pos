/*
  # Create Audit Trail System

  1. New Tables
    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `action` (text) - The type of action performed
      - `table_name` (text) - The table that was affected
      - `record_id` (text) - ID of the affected record
      - `old_data` (jsonb) - Previous state of the record
      - `new_data` (jsonb) - New state of the record
      - `ip_address` (text) - IP address of the user
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `audit_logs` table
    - Add policies for admin access
*/

CREATE TABLE audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    action text NOT NULL,
    table_name text NOT NULL,
    record_id text NOT NULL,
    old_data jsonb,
    new_data jsonb,
    ip_address text,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view all audit logs"
    ON audit_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );