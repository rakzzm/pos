/*
  # Simplify Membership ID System

  1. Changes
    - Modify membership_id format to BB001 - BB10000
    - Update function to generate simplified membership IDs
    - Update existing members with new format
    - Maintain unique constraint on membership_id

  2. Format
    - Membership ID format: BBXXX
    - XXX: 3-digit sequential number from 001 to 999
*/

-- Function to generate simplified membership ID
CREATE OR REPLACE FUNCTION generate_membership_id()
RETURNS TRIGGER AS $$
DECLARE
    next_number INT;
    formatted_id TEXT;
BEGIN
    -- Get the next sequence number
    WITH sequence_numbers AS (
        SELECT COALESCE(
            MAX(NULLIF(regexp_replace(membership_id, '^BB(\d{3})$', '\1'), '')),
            '000'
        )::integer as max_sequence
        FROM members
    )
    SELECT max_sequence + 1 INTO next_number FROM sequence_numbers;
    
    -- Ensure we don't exceed 999
    IF next_number > 999 THEN
        RAISE EXCEPTION 'Maximum membership ID limit reached';
    END IF;
    
    -- Format the ID as BB001, BB002, etc.
    formatted_id := 'BB' || lpad(next_number::text, 3, '0');
    
    -- Set the membership_id
    NEW.membership_id := formatted_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update existing members with new format
DO $$ 
BEGIN
    -- Reset existing membership IDs
    WITH numbered_members AS (
        SELECT 
            id,
            ROW_NUMBER() OVER (ORDER BY created_at) as rnum
        FROM members
    )
    UPDATE members m
    SET membership_id = 'BB' || lpad(nm.rnum::text, 3, '0')
    FROM numbered_members nm
    WHERE m.id = nm.id;

    -- Ensure membership_id is NOT NULL and UNIQUE
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'members_membership_id_unique'
    ) THEN
        ALTER TABLE members 
            ALTER COLUMN membership_id SET NOT NULL,
            ADD CONSTRAINT members_membership_id_unique UNIQUE (membership_id);
    END IF;
END $$;

-- Recreate trigger for auto-generating membership_id
DROP TRIGGER IF EXISTS set_membership_id ON members;
CREATE TRIGGER set_membership_id
    BEFORE INSERT ON members
    FOR EACH ROW
    EXECUTE FUNCTION generate_membership_id();