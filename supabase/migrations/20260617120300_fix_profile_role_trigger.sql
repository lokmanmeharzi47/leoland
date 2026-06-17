-- Allow the Supabase Dashboard and Service Roles to edit the role column

CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS trigger AS $$
BEGIN
  -- Allow service_role, postgres (dashboard), and admins to change the role
  IF current_user IN ('postgres', 'service_role', 'supabase_admin') THEN
    RETURN NEW;
  END IF;

  -- Prevent role escalation: if user is not admin, they cannot change their role
  IF NOT public.is_admin() THEN
    NEW.role = OLD.role;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
