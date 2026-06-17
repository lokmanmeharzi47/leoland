-- Task 4: Complete RLS Implementation

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (select auth.uid()) AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. avatar_items (Content - readable by all)
CREATE POLICY "Anyone can read avatar items" ON public.avatar_items FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage avatar items" ON public.avatar_items FOR ALL TO public USING (public.is_admin());

-- 2. badges (Content - readable by all)
CREATE POLICY "Anyone can read badges" ON public.badges FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage badges" ON public.badges FOR ALL TO public USING (public.is_admin());

-- 3. block_progress (Student data)
CREATE POLICY "Students can access own block progress" ON public.block_progress FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());
CREATE POLICY "Students can insert own block progress" ON public.block_progress FOR INSERT TO public WITH CHECK (student_id = (select auth.uid()) OR public.is_admin());
CREATE POLICY "Students can update own block progress" ON public.block_progress FOR UPDATE TO public USING (student_id = (select auth.uid()) OR public.is_admin());

-- 4. game_sessions (Student data)
CREATE POLICY "Students can access own game sessions" ON public.game_sessions FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());
CREATE POLICY "Students can insert own game sessions" ON public.game_sessions FOR INSERT TO public WITH CHECK (student_id = (select auth.uid()) OR public.is_admin());

-- 5. generated_stories (Student data)
CREATE POLICY "Students can access own stories" ON public.generated_stories FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());

-- 6. parent_reports (Student / Parent data)
CREATE POLICY "Parents and students can read reports" ON public.parent_reports FOR SELECT TO public 
USING (
  student_id = (select auth.uid()) 
  OR EXISTS (SELECT 1 FROM public.parent_student_links WHERE student_id = parent_reports.student_id AND parent_id = (select auth.uid()))
  OR public.is_admin()
);

-- 7. parent_student_links (Relational data)
CREATE POLICY "Parents and students can read links" ON public.parent_student_links FOR SELECT TO public
USING (parent_id = (select auth.uid()) OR student_id = (select auth.uid()) OR public.is_admin());

-- 8. parents
CREATE POLICY "Parents can read own record" ON public.parents FOR SELECT TO public USING (id = (select auth.uid()) OR public.is_admin());

-- 9. pronunciation_attempts
CREATE POLICY "Students can access own pronunciation attempts" ON public.pronunciation_attempts FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());
CREATE POLICY "Students can insert own pronunciation attempts" ON public.pronunciation_attempts FOR INSERT TO public WITH CHECK (student_id = (select auth.uid()) OR public.is_admin());

-- 10. quizzes (Content)
CREATE POLICY "Anyone can read quizzes" ON public.quizzes FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage quizzes" ON public.quizzes FOR ALL TO public USING (public.is_admin());

-- 11. quiz_answers (Content)
CREATE POLICY "Anyone can read quiz answers" ON public.quiz_answers FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage quiz answers" ON public.quiz_answers FOR ALL TO public USING (public.is_admin());

-- 12. student_badges
CREATE POLICY "Students can read own badges" ON public.student_badges FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());

-- 13. student_inventory
CREATE POLICY "Students can read own inventory" ON public.student_inventory FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());

-- 14. students
CREATE POLICY "Students can read own record" ON public.students FOR SELECT TO public 
USING (
  id = (select auth.uid()) 
  OR EXISTS (SELECT 1 FROM public.parent_student_links WHERE student_id = students.id AND parent_id = (select auth.uid()))
  OR public.is_admin()
);

-- 15. teachers
CREATE POLICY "Teachers can read own record" ON public.teachers FOR SELECT TO public USING (id = (select auth.uid()) OR public.is_admin());

-- 16. tutor_messages
CREATE POLICY "Students can read own tutor messages" ON public.tutor_messages FOR SELECT TO public
USING (
  EXISTS (SELECT 1 FROM public.tutor_conversations WHERE id = tutor_messages.conversation_id AND student_id = (select auth.uid()))
  OR public.is_admin()
);
CREATE POLICY "Students can insert own tutor messages" ON public.tutor_messages FOR INSERT TO public
WITH CHECK (
  EXISTS (SELECT 1 FROM public.tutor_conversations WHERE id = tutor_messages.conversation_id AND student_id = (select auth.uid()))
  OR public.is_admin()
);

-- 17. vocabulary_memory
-- Assuming student_id exists on vocabulary_memory based on typical schema pattern
CREATE POLICY "Students can read own vocabulary memory" ON public.vocabulary_memory FOR SELECT TO public USING (student_id = (select auth.uid()) OR public.is_admin());
CREATE POLICY "Students can update own vocabulary memory" ON public.vocabulary_memory FOR UPDATE TO public USING (student_id = (select auth.uid()) OR public.is_admin());

-- 18. events_y2026m06
CREATE POLICY "Users can insert own events" ON public.events_y2026m06 FOR INSERT TO public WITH CHECK (user_id = (select auth.uid()) OR public.is_admin());
CREATE POLICY "Users can read own events" ON public.events_y2026m06 FOR SELECT TO public USING (user_id = (select auth.uid()) OR public.is_admin());
