-- Task 5: Database Performance (Indexes for FKs)

CREATE INDEX IF NOT EXISTS idx_block_progress_lesson_block_id ON public.block_progress(lesson_block_id);
CREATE INDEX IF NOT EXISTS idx_block_progress_student_id ON public.block_progress(student_id);

CREATE INDEX IF NOT EXISTS idx_game_sessions_student_id ON public.game_sessions(student_id);

CREATE INDEX IF NOT EXISTS idx_generated_stories_student_id ON public.generated_stories(student_id);

CREATE INDEX IF NOT EXISTS idx_lesson_blocks_lesson_id ON public.lesson_blocks(lesson_id);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student_id ON public.lesson_progress(student_id);

CREATE INDEX IF NOT EXISTS idx_lessons_created_by ON public.lessons(created_by);
CREATE INDEX IF NOT EXISTS idx_lessons_quest_id ON public.lessons(quest_id);

CREATE INDEX IF NOT EXISTS idx_parent_reports_student_id ON public.parent_reports(student_id);

CREATE INDEX IF NOT EXISTS idx_parent_student_links_student_id ON public.parent_student_links(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_student_links_parent_id ON public.parent_student_links(parent_id);

CREATE INDEX IF NOT EXISTS idx_pronunciation_attempts_student_id ON public.pronunciation_attempts(student_id);

CREATE INDEX IF NOT EXISTS idx_quests_unit_id ON public.quests(unit_id);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_quiz_id ON public.quiz_answers(quiz_id);

CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_block_id ON public.quizzes(lesson_block_id);

CREATE INDEX IF NOT EXISTS idx_student_badges_badge_id ON public.student_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_student_badges_student_id ON public.student_badges(student_id);

CREATE INDEX IF NOT EXISTS idx_student_inventory_item_id ON public.student_inventory(item_id);
CREATE INDEX IF NOT EXISTS idx_student_inventory_student_id ON public.student_inventory(student_id);

CREATE INDEX IF NOT EXISTS idx_tutor_conversations_student_id ON public.tutor_conversations(student_id);

CREATE INDEX IF NOT EXISTS idx_tutor_messages_conversation_id ON public.tutor_messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_units_world_id ON public.units(world_id);

CREATE INDEX IF NOT EXISTS idx_xp_transactions_student_id ON public.xp_transactions(student_id);
