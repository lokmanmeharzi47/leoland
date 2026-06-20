BEGIN;

-- ==============================================================================
-- 1. Fix learning-world ordering
-- ==============================================================================
UPDATE public.worlds SET order_index = 1 WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE public.worlds SET order_index = 2 WHERE id = '22222222-2222-2222-2222-222222222222';
UPDATE public.worlds SET order_index = 3 WHERE id = '33333333-3333-3333-3333-333333333333';
UPDATE public.worlds SET order_index = 4 WHERE id = '44444444-4444-4444-4444-444444444444';
UPDATE public.worlds SET order_index = 5 WHERE id = '55555555-5555-5555-5555-555555555555';

-- ==============================================================================
-- 2. Prevent 'parent' role usage via CHECK constraint
-- ==============================================================================
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS chk_profiles_role_not_parent;

ALTER TABLE public.profiles
ADD CONSTRAINT chk_profiles_role_not_parent CHECK (role IN ('admin', 'teacher', 'student'));

-- ==============================================================================
-- 3. Seed badges idempotently
-- ==============================================================================
INSERT INTO public.badges (title, description, image_url)
SELECT * FROM (VALUES
    ('First Steps', 'Complete your very first lesson.', NULL),
    ('Vocabulary Explorer', 'Learn 50 new words.', NULL),
    ('Grammar Hero', 'Complete the Grammar Castle unit.', NULL),
    ('Speaking Star', 'Achieve a perfect pronunciation score.', NULL),
    ('Reading Champion', 'Read 10 complete stories.', NULL),
    ('Writing Wizard', 'Write 5 perfect sentences.', NULL),
    ('Seven-Day Streak', 'Maintain a learning streak for 7 consecutive days.', NULL),
    ('Quiz Master', 'Score 100% on 5 quizzes.', NULL),
    ('Animal Explorer', 'Complete the Animal Explorer quest.', NULL),
    ('Leo Legend', 'Achieve the maximum level.', NULL)
) AS v(title, description, image_url)
WHERE NOT EXISTS (
    SELECT 1 FROM public.badges b WHERE b.title = v.title
);

-- ==============================================================================
-- 4. Seed avatar store items idempotently
-- ==============================================================================
INSERT INTO public.avatar_items (name, price, category)
SELECT * FROM (VALUES
    ('Explorer Cap', 30, 'accessory'),
    ('Wizard Hat', 60, 'accessory'),
    ('Star Glasses', 45, 'accessory'),
    ('Ocean Shell Necklace', 55, 'accessory'),
    ('Forest Explorer Outfit', 100, 'outfit'),
    ('Castle Knight Outfit', 120, 'outfit'),
    ('Ocean Diver Outfit', 120, 'outfit'),
    ('Mini Leo Cub', 180, 'pet'),
    ('Vocabulary Forest Scene', 75, 'scene'),
    ('Grammar Castle Scene', 90, 'scene')
) AS v(name, price, category)
WHERE NOT EXISTS (
    SELECT 1 FROM public.avatar_items a WHERE a.name = v.name
);

-- ==============================================================================
-- 5. Seed games conditionally (Frontend supports them)
-- ==============================================================================
INSERT INTO public.games (title, description, category, difficulty, xp_reward, status)
SELECT * FROM (VALUES
    ('Word Match', 'Match words with their meanings.', 'vocabulary', 'easy', 20, 'published'),
    ('Animal Sounds', 'Listen to the sound and pick the animal.', 'listening', 'easy', 15, 'published'),
    ('Sentence Builder', 'Drag words to form a correct sentence.', 'grammar', 'medium', 30, 'published'),
    ('Vocabulary Flashcards', 'Test your memory with flashcards.', 'vocabulary', 'easy', 10, 'published'),
    ('Pronunciation Challenge', 'Speak the phrase correctly.', 'speaking', 'hard', 50, 'published')
) AS v(title, description, category, difficulty, xp_reward, status)
WHERE NOT EXISTS (
    SELECT 1 FROM public.games g WHERE g.title = v.title
);

COMMIT;
