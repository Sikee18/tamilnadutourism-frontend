-- Create an Enum for User Roles
CREATE TYPE public.user_role AS ENUM ('ADMIN', 'EMP', 'USER');

-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role public.user_role DEFAULT 'USER'::public.user_role;

-- Enforce that there can be only one ADMIN
CREATE UNIQUE INDEX one_admin_only ON public.profiles (role) 
WHERE role = 'ADMIN';

-- Update the handle_new_user function to include role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'USER'::public.user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
