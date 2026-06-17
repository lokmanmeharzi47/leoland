-- Task 3: RLS Performance Optimization
-- Drop old policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Students can read own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Students can read own xp" ON public.xp_transactions;
DROP POLICY IF EXISTS "Students can read own conversations" ON public.tutor_conversations;

-- Recreate policies with (select auth.uid())
CREATE POLICY "Users can read own profile"
ON public.profiles FOR SELECT
TO public
USING (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO public
USING (id = (select auth.uid()));

CREATE POLICY "Students can read own progress"
ON public.lesson_progress FOR SELECT
TO public
USING (student_id = (select auth.uid()));

CREATE POLICY "Students can read own xp"
ON public.xp_transactions FOR SELECT
TO public
USING (student_id = (select auth.uid()));

CREATE POLICY "Students can read own conversations"
ON public.tutor_conversations FOR SELECT
TO public
USING (student_id = (select auth.uid()));
