/*
  # Create sponsorship_inquiries table

  1. New Tables
    - `sponsorship_inquiries`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `company` (text, optional)
      - `email` (text, required)
      - `phone` (text, optional)
      - `partnership_interest` (text, required)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS
    - INSERT policy for anyone (public form, no auth required)
    - No SELECT policy (submissions are private to admins only)
*/

CREATE TABLE IF NOT EXISTS sponsorship_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  partnership_interest text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sponsorship_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a sponsorship inquiry"
  ON sponsorship_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (
    first_name <> '' AND
    last_name <> '' AND
    email <> '' AND
    partnership_interest <> ''
  );
