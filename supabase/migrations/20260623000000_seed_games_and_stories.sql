BEGIN;

-- 1. Add missing media columns to games and stories
ALTER TABLE public.games
ADD COLUMN IF NOT EXISTS cover_url TEXT,
ADD COLUMN IF NOT EXISTS audio_url TEXT,
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

ALTER TABLE public.stories
ADD COLUMN IF NOT EXISTS cover_url TEXT,
ADD COLUMN IF NOT EXISTS audio_url TEXT,
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 2. Ensure Storage Buckets exist (for local/production)
-- Uses postgres ON CONFLICT DO NOTHING if bucket already exists
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('game-covers', 'game-covers', true),
  ('story-covers', 'story-covers', true),
  ('game-audio', 'game-audio', true),
  ('story-audio', 'story-audio', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies
-- We do not allow students to upload, only read
-- Since RLS policies might already exist, we wrap in DO blocks to avoid errors
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Game Covers' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Public Access to Game Covers" ON storage.objects FOR SELECT TO public USING (bucket_id = 'game-covers');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Story Covers' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Public Access to Story Covers" ON storage.objects FOR SELECT TO public USING (bucket_id = 'story-covers');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Game Audio' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Public Access to Game Audio" ON storage.objects FOR SELECT TO public USING (bucket_id = 'game-audio');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Story Audio' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Public Access to Story Audio" ON storage.objects FOR SELECT TO public USING (bucket_id = 'story-audio');
    END IF;
END $$;

-- 4. Seed 12 Games (Deterministic UUIDs)
INSERT INTO public.games (id, title, description, category, difficulty, xp_reward, status, slug, cover_url)
VALUES
  ('aaaa1111-1111-1111-1111-111111111111', 'Alphabet Safari', 'Identify English letters', 'Alphabet', 'Easy', 25, 'published', 'alphabet-safari', NULL),
  ('aaaa1111-1111-1111-1111-111111111112', 'Arabic Letter Garden', 'Recognize Arabic letters', 'Alphabet', 'Easy', 30, 'published', 'arabic-letter-garden', NULL),
  ('aaaa1111-1111-1111-1111-111111111113', 'Number Jungle', 'Count 1–10', 'Numbers', 'Easy', 30, 'published', 'number-jungle', NULL),
  ('aaaa1111-1111-1111-1111-111111111114', 'Space Math Stars', 'Basic addition', 'Numbers', 'Medium', 45, 'published', 'space-math-stars', NULL),
  ('aaaa1111-1111-1111-1111-111111111115', 'Word Match Quest', 'Match words to images', 'Languages', 'Medium', 50, 'published', 'word-match-quest', NULL),
  ('aaaa1111-1111-1111-1111-111111111116', 'French Greetings Ocean', 'Practice French greetings', 'Languages', 'Easy', 40, 'published', 'french-greetings-ocean', NULL),
  ('aaaa1111-1111-1111-1111-111111111117', 'Grammar Castle Puzzle', 'Build simple sentences', 'Puzzle', 'Medium', 60, 'published', 'grammar-castle-puzzle', NULL),
  ('aaaa1111-1111-1111-1111-111111111118', 'Missing Word Maze', 'Complete vocabulary sentences', 'Puzzle', 'Hard', 70, 'published', 'missing-word-maze', NULL),
  ('aaaa1111-1111-1111-1111-111111111119', 'Color Your Story', 'Learn colors and descriptive words', 'Creativity', 'Easy', 35, 'published', 'color-your-story', NULL),
  ('aaaa1111-1111-1111-1111-111111111120', 'Magic Sentence Builder', 'Create short sentences', 'Creativity', 'Medium', 50, 'published', 'magic-sentence-builder', NULL),
  ('aaaa1111-1111-1111-1111-111111111121', 'Leo Memory Cards', 'Match vocabulary pairs', 'Memory', 'Easy', 35, 'published', 'leo-memory-cards', NULL),
  ('aaaa1111-1111-1111-1111-111111111122', 'Animal Sound Memory', 'Match animals, names, and sounds', 'Memory', 'Medium', 45, 'published', 'animal-sound-memory', NULL)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  xp_reward = EXCLUDED.xp_reward,
  status = EXCLUDED.status,
  slug = EXCLUDED.slug,
  cover_url = EXCLUDED.cover_url;

-- 5. Seed 12 Stories (Deterministic UUIDs)
INSERT INTO public.stories (id, title, content, level, language, published, slug, cover_url)
VALUES
  ('bbbb2222-2222-2222-2222-222222222221', 'The Lost Lion', 'Once upon a time, a young lion lost his way in the great Savannah. He asked a friendly elephant for directions...', 'Beginner', 'en', true, 'the-lost-lion', NULL),
  ('bbbb2222-2222-2222-2222-222222222222', 'The Secret Ocean Map', 'Deep beneath the waves, a brave dolphin found an old map that led to the secret underwater city.', 'Intermediate', 'en', true, 'the-secret-ocean-map', NULL),
  ('bbbb2222-2222-2222-2222-222222222223', 'The Moon Garden', 'Far away in space, there is a magical garden on the moon where stars grow like flowers.', 'Beginner', 'en', true, 'the-moon-garden', NULL),
  ('bbbb2222-2222-2222-2222-222222222224', 'The Brave Little Fox', 'A brave little fox had to journey through the dark forest to find the magical singing bird.', 'Advanced', 'en', true, 'the-brave-little-fox', NULL),
  ('bbbb2222-2222-2222-2222-222222222225', 'Le Dragon Magique', 'Il était une fois un dragon magique qui vivait dans un château sur les nuages...', 'Beginner', 'fr', true, 'le-dragon-magique', NULL),
  ('bbbb2222-2222-2222-2222-222222222226', 'La Baleine Bleue', 'La baleine bleue voyage à travers tout l''océan pour trouver sa famille.', 'Beginner', 'fr', true, 'la-baleine-bleue', NULL),
  ('bbbb2222-2222-2222-2222-222222222227', 'Le Voyage de Leo vers la Lune', 'Leo a construit une fusée dans son jardin et a décidé de visiter la lune.', 'Intermediate', 'fr', true, 'le-voyage-de-leo-vers-la-lune', NULL),
  ('bbbb2222-2222-2222-2222-222222222228', 'La Forêt des Mots', 'Dans la forêt des mots, chaque arbre chante une chanson différente.', 'Advanced', 'fr', true, 'la-foret-des-mots', NULL),
  ('bbbb2222-2222-2222-2222-222222222229', 'رحلة إلى القمر', 'في يوم من الأيام، قرر طفل صغير بناء صاروخ للذهاب إلى القمر لرؤية النجوم عن قرب...', 'Beginner', 'ar', true, 'journey-to-the-moon', NULL),
  ('bbbb2222-2222-2222-2222-222222222230', 'مغامرة ليو في الغابة', 'ذهب الأسد ليو في رحلة طويلة عبر الغابة للبحث عن أصدقائه الجدد...', 'Beginner', 'ar', true, 'leos-jungle-adventure', NULL),
  ('bbbb2222-2222-2222-2222-222222222231', 'خريطة البحر السرية', 'وجد البحار خريطة سرية تقوده إلى الكنز المخبأ في أعماق المحيط...', 'Intermediate', 'ar', true, 'the-secret-sea-map', NULL),
  ('bbbb2222-2222-2222-2222-222222222232', 'الثعلب الصغير الشجاع', 'كان هناك ثعلب صغير يحب استكشاف الأماكن المجهولة، وفي يوم من الأيام واجه دباً كبيراً...', 'Advanced', 'ar', true, 'the-brave-little-fox-ar', NULL)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  level = EXCLUDED.level,
  language = EXCLUDED.language,
  published = EXCLUDED.published,
  slug = EXCLUDED.slug,
  cover_url = EXCLUDED.cover_url;

-- 6. Student Demo Activity (student_id: 33333333-3333-3333-3333-333333333331)
DO $$
DECLARE
    student_id uuid := '33333333-3333-3333-3333-333333333331';
BEGIN
    -- Only insert if the student actually exists in profiles
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = student_id) THEN
    
        -- Recent game activity (using game IDs created above)
        INSERT INTO public.student_activity (student_id, activity_type, title, xp_earned, game_id, created_at)
        VALUES
          (student_id, 'played_game', 'Word Match Quest', 50, 'aaaa1111-1111-1111-1111-111111111115', NOW() - INTERVAL '1 day'),
          (student_id, 'played_game', 'Alphabet Safari', 25, 'aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days'),
          (student_id, 'played_game', 'Leo Memory Cards', 35, 'aaaa1111-1111-1111-1111-111111111121', NOW() - INTERVAL '3 days')
        ON CONFLICT DO NOTHING;
        
        -- Game sessions for "Recently Played"
        -- Checking if game_sessions exists. If it exists in a previous migration, we can insert.
        -- We won't use it directly here if it errors out, but it should exist based on earlier RLS.
        BEGIN
            INSERT INTO public.game_sessions (id, student_id, game_id, score, completed_at)
            VALUES
              (gen_random_uuid(), student_id, 'aaaa1111-1111-1111-1111-111111111115', 100, NOW() - INTERVAL '1 day'),
              (gen_random_uuid(), student_id, 'aaaa1111-1111-1111-1111-111111111111', 80, NOW() - INTERVAL '2 days'),
              (gen_random_uuid(), student_id, 'aaaa1111-1111-1111-1111-111111111121', 90, NOW() - INTERVAL '3 days')
            ON CONFLICT DO NOTHING;
        EXCEPTION WHEN undefined_table THEN
            -- Safely ignore if game_sessions isn't currently available for insert
        END;

        -- Recent story activity
        INSERT INTO public.student_activity (student_id, activity_type, title, xp_earned, story_id, created_at)
        VALUES
          (student_id, 'completed_story', 'The Lost Lion', 100, 'bbbb2222-2222-2222-2222-222222222221', NOW() - INTERVAL '1 day'),
          (student_id, 'completed_story', 'Le Dragon Magique', 120, 'bbbb2222-2222-2222-2222-222222222225', NOW() - INTERVAL '4 days')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

COMMIT;
