-- 1. Create a trigger to automatically connect auth.users to public.profiles

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  extracted_role public.user_role;
  extracted_name text;
BEGIN
  -- Extract from metadata, defaulting to student if missing or invalid
  BEGIN
    extracted_role := COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role);
  EXCEPTION WHEN invalid_text_representation THEN
    extracted_role := 'student'::public.user_role;
  END;
  
  extracted_name := COALESCE(new.raw_user_meta_data->>'full_name', '');

  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name, role, language)
  VALUES (new.id, new.email, extracted_name, extracted_role, 'English');

  -- If student, insert student record
  IF extracted_role = 'student' THEN
    INSERT INTO public.students (id, level, total_xp, leo_coins, streak_days)
    VALUES (new.id, 1, 0, 0, 0);
  ELSIF extracted_role = 'parent' THEN
    INSERT INTO public.parents (id) VALUES (new.id);
  ELSIF extracted_role = 'teacher' THEN
    INSERT INTO public.teachers (id) VALUES (new.id);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Secure the role column from being updated by normal users
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS trigger AS $$
BEGIN
  -- Prevent role escalation: if user is not admin, they cannot change their role
  IF NOT public.is_admin() THEN
    NEW.role = OLD.role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS enforce_profile_role ON public.profiles;
CREATE TRIGGER enforce_profile_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_role();
