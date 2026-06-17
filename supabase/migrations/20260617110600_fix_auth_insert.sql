-- Fix missing INSERT policies for auth signup flow

CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO public WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Students can insert own record" ON public.students FOR INSERT TO public WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Parents can insert own record" ON public.parents FOR INSERT TO public WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Teachers can insert own record" ON public.teachers FOR INSERT TO public WITH CHECK (id = (select auth.uid()));
