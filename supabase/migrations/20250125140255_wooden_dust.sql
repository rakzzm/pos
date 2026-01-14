/*
  # Add Membership ID System

  1. Changes
    - Add membership_id column to members table
    - Add function to generate formatted membership ID
    - Update existing members with formatted membership IDs
    - Add unique constraint on membership_id
    - Add trigger to auto-generate membership_id for new members

  2. Format
    - Membership ID format: MEM-YYYY-XXXXX
    - YYYY: Year of joining
    - XXXXX: 5-digit sequential number
*/

-- Function to generate formatted membership ID
CREATE OR REPLACE FUNCTION generate_membership_id()
RETURNS TRIGGER AS $$
DECLARE
    year_part TEXT;
    sequence_number INT;
    formatted_sequence TEXT;
BEGIN
    -- Get current year
    year_part := to_char(CURRENT_DATE, 'YYYY');
    
    -- Get the next sequence number for this year
    WITH sequence_numbers AS (
        SELECT COALESCE(
            MAX(NULLIF(regexp_replace(membership_id, '^MEM-\d{4}-(\d{5})$', '\1'), '')),
            '00000'
        )::integer as max_sequence
        FROM members
        WHERE membership_id LIKE 'MEM-' || year_part || '-%'
    )
    SELECT max_sequence + 1 INTO sequence_number FROM sequence_numbers;
    
    -- Format the sequence number to 5 digits
    formatted_sequence := lpad(sequence_number::text, 5, '0');
    
    -- Set the membership_id
    NEW.membership_id := 'MEM-' || year_part || '-' || formatted_sequence;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add membership_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'membership_id'
    ) THEN
        ALTER TABLE members ADD COLUMN membership_id TEXT;
        
        -- Generate membership IDs for existing members
        WITH numbered_members AS (
            SELECT 
                id,
                ROW_NUMBER() OVER (ORDER BY created_at) as rnum,
                to_char(created_at, 'YYYY') as join_year
            FROM members
            WHERE membership_id IS NULL
        )
        UPDATE members m
        SET membership_id = 'MEM-' || nm.join_year || '-' || lpad(nm.rnum::text, 5, '0')
        FROM numbered_members nm
        WHERE m.id = nm.id;
        
        -- Make membership_id NOT NULL and UNIQUE
        ALTER TABLE members 
            ALTER COLUMN membership_id SET NOT NULL,
            ADD CONSTRAINT members_membership_id_unique UNIQUE (membership_id);
    END IF;
END $$;

-- Create trigger for auto-generating membership_id
DROP TRIGGER IF EXISTS set_membership_id ON members;
CREATE TRIGGER set_membership_id
    BEFORE INSERT ON members
    FOR EACH ROW
    EXECUTE FUNCTION generate_membership_id();