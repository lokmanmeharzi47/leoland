BEGIN;

-- ==============================================================================
-- 1. Create Mock Users in auth.users
-- This will trigger handle_new_user() to create public.profiles.
-- Note: Requires execute_sql to have privileges on auth schema.
-- ==============================================================================
DO $$
DECLARE
    admin_id uuid := '00000000-0000-0000-0000-000000000001';
    teacher1_id uuid := '11111111-1111-1111-1111-111111111111';
    teacher2_id uuid := '22222222-2222-2222-2222-222222222222';
    student1_id uuid := '33333333-3333-3333-3333-333333333331';
    student2_id uuid := '33333333-3333-3333-3333-333333333332';
    student3_id uuid := '33333333-3333-3333-3333-333333333333';
    student4_id uuid := '33333333-3333-3333-3333-333333333334';
    student5_id uuid := '33333333-3333-3333-3333-333333333335';
    classroom1_id uuid := '44444444-4444-4444-4444-444444444441';
    classroom2_id uuid := '44444444-4444-4444-4444-444444444442';
BEGIN
    -- Insert auth.users
    INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
    VALUES 
        (admin_id, 'admin@leoland.com', '{"full_name":"Admin User","role":"admin"}', NOW(), NOW()),
        (teacher1_id, 'teacher1@leoland.com', '{"full_name":"Ms. Sarah","role":"teacher"}', NOW(), NOW()),
        (teacher2_id, 'teacher2@leoland.com', '{"full_name":"Mr. Ahmed","role":"teacher"}', NOW(), NOW()),
        (student1_id, 'student1@leoland.com', '{"full_name":"Mia","role":"student"}', NOW(), NOW()),
        (student2_id, 'student2@leoland.com', '{"full_name":"Lucas","role":"student"}', NOW(), NOW()),
        (student3_id, 'student3@leoland.com', '{"full_name":"Emma","role":"student"}', NOW(), NOW()),
        (student4_id, 'student4@leoland.com', '{"full_name":"Noah","role":"student"}', NOW(), NOW()),
        (student5_id, 'student5@leoland.com', '{"full_name":"Olivia","role":"student"}', NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;

    -- Ensure profiles have the right roles (in case trigger missed it or if they already existed)
    UPDATE public.profiles SET role = 'admin', full_name = 'Admin User' WHERE id = admin_id;
    UPDATE public.profiles SET role = 'teacher', full_name = 'Ms. Sarah' WHERE id = teacher1_id;
    UPDATE public.profiles SET role = 'teacher', full_name = 'Mr. Ahmed' WHERE id = teacher2_id;
    UPDATE public.profiles SET role = 'student', full_name = 'Mia', total_xp = 1250, streak = 5, level = 3 WHERE id = student1_id;
    UPDATE public.profiles SET role = 'student', full_name = 'Lucas', total_xp = 800, streak = 2, level = 2 WHERE id = student2_id;
    UPDATE public.profiles SET role = 'student', full_name = 'Emma', total_xp = 2100, streak = 12, level = 5 WHERE id = student3_id;
    UPDATE public.profiles SET role = 'student', full_name = 'Noah', total_xp = 400, streak = 1, level = 1 WHERE id = student4_id;
    UPDATE public.profiles SET role = 'student', full_name = 'Olivia', total_xp = 1600, streak = 8, level = 4 WHERE id = student5_id;

    -- ==============================================================================
    -- 2. Create Classrooms
    -- ==============================================================================
    INSERT INTO public.classrooms (id, teacher_id, name)
    VALUES 
        (classroom1_id, teacher1_id, 'Ms. Sarah - Grade 3'),
        (classroom2_id, teacher2_id, 'Mr. Ahmed - Grade 4')
    ON CONFLICT (id) DO NOTHING;

    -- ==============================================================================
    -- 3. Assign Students to Classrooms
    -- ==============================================================================
    INSERT INTO public.classroom_students (classroom_id, student_id)
    VALUES 
        (classroom1_id, student1_id),
        (classroom1_id, student2_id),
        (classroom2_id, student3_id),
        (classroom2_id, student4_id),
        (classroom2_id, student5_id)
    ON CONFLICT (classroom_id, student_id) DO NOTHING;

    -- ==============================================================================
    -- 4. Seed Stories
    -- ==============================================================================
    INSERT INTO public.stories (title, content, target_language, difficulty, min_level, is_premium)
    VALUES
        ('The Lost Lion', 'Once upon a time, a young lion lost his way in the great Savannah. He asked a friendly elephant for directions...', 'en', 'easy', 1, false),
        ('Le Dragon Magique', 'Il était une fois un dragon magique qui vivait dans un château sur les nuages...', 'fr', 'medium', 2, false),
        ('رحلة إلى القمر', 'في يوم من الأيام، قرر طفل صغير بناء صاروخ للذهاب إلى القمر...', 'ar', 'medium', 3, true),
        ('The Brave Little Turtle', 'A brave little turtle wanted to see the world. So she packed a tiny bag...', 'en', 'easy', 1, false)
    ON CONFLICT DO NOTHING;

    -- ==============================================================================
    -- 5. Give Students some Mock Activity
    -- ==============================================================================
    INSERT INTO public.student_activity (student_id, activity_type, xp_earned, item_id)
    VALUES
        (student1_id, 'played_game', 50, (SELECT id FROM public.games WHERE title = 'Word Match' LIMIT 1)),
        (student1_id, 'completed_story', 100, (SELECT id FROM public.stories WHERE title = 'The Lost Lion' LIMIT 1)),
        (student2_id, 'played_game', 30, (SELECT id FROM public.games WHERE title = 'Animal Sounds' LIMIT 1)),
        (student3_id, 'ai_conversation', 45, NULL),
        (student5_id, 'completed_story', 120, (SELECT id FROM public.stories WHERE title = 'Le Dragon Magique' LIMIT 1))
    ON CONFLICT DO NOTHING;

END $$;

COMMIT;
