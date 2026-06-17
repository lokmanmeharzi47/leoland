-- 1. Drop parent related tables safely
-- Because they might be referenced by other tables, we use CASCADE if necessary, 
-- but let's be explicit.
DROP TABLE IF EXISTS public.parent_reports CASCADE;
DROP TABLE IF EXISTS public.parent_student_links CASCADE;
DROP TABLE IF EXISTS public.parents CASCADE;

-- 2. Update the auth trigger so it doesn't try to insert into the parents table
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
  ELSIF extracted_role = 'teacher' THEN
    INSERT INTO public.teachers (id) VALUES (new.id);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
