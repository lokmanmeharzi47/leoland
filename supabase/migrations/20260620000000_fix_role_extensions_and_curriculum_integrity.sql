BEGIN;

-- ==============================================================================
-- 1. Fix Role Extension Inconsistencies
-- ==============================================================================

-- Delete from students where profile role is NOT 'student'
DELETE FROM public.students 
WHERE id IN (
    SELECT s.id 
    FROM public.students s
    JOIN public.profiles p ON s.id = p.id
    WHERE p.role != 'student'
);

-- Ensure the teacher 'c@gmail.com' has a teachers row
INSERT INTO public.teachers (id)
SELECT id FROM public.profiles WHERE email = 'c@gmail.com' AND role = 'teacher'
ON CONFLICT (id) DO NOTHING;


-- ==============================================================================
-- 2. Safe Role Synchronization Trigger
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.sync_role_extensions()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.role = 'student' THEN
        -- Ensure student record exists
        INSERT INTO public.students (id, level, total_xp, leo_coins, streak_days)
        VALUES (NEW.id, 1, 0, 0, 0)
        ON CONFLICT (id) DO NOTHING;
        
        -- Attempt to remove teacher record if it exists
        IF EXISTS (SELECT 1 FROM public.teachers WHERE id = NEW.id) THEN
            IF EXISTS (SELECT 1 FROM public.classrooms WHERE teacher_id = NEW.id) OR
               EXISTS (SELECT 1 FROM public.assignments WHERE teacher_id = NEW.id) THEN
                RAISE EXCEPTION 'Cannot change role to student: Teacher record has dependent classrooms or assignments.';
            ELSE
                DELETE FROM public.teachers WHERE id = NEW.id;
            END IF;
        END IF;

    ELSIF NEW.role = 'teacher' THEN
        -- Ensure teacher record exists
        INSERT INTO public.teachers (id)
        VALUES (NEW.id)
        ON CONFLICT (id) DO NOTHING;
        
        -- Attempt to remove student record if it exists
        IF EXISTS (SELECT 1 FROM public.students WHERE id = NEW.id) THEN
            IF EXISTS (SELECT 1 FROM public.student_activity WHERE student_id = NEW.id) OR
               EXISTS (SELECT 1 FROM public.lesson_progress WHERE student_id = NEW.id) OR
               EXISTS (SELECT 1 FROM public.xp_transactions WHERE student_id = NEW.id) THEN
                RAISE EXCEPTION 'Cannot change role to teacher: Student record has dependent progress or activity data.';
            ELSE
                DELETE FROM public.students WHERE id = NEW.id;
            END IF;
        END IF;

    ELSIF NEW.role = 'admin' THEN
        -- Attempt to safely remove both if they exist
        IF EXISTS (SELECT 1 FROM public.students WHERE id = NEW.id) THEN
            IF EXISTS (SELECT 1 FROM public.student_activity WHERE student_id = NEW.id) THEN
                RAISE EXCEPTION 'Cannot change role to admin: Student record has dependent data.';
            ELSE
                DELETE FROM public.students WHERE id = NEW.id;
            END IF;
        END IF;
        
        IF EXISTS (SELECT 1 FROM public.teachers WHERE id = NEW.id) THEN
            IF EXISTS (SELECT 1 FROM public.classrooms WHERE teacher_id = NEW.id) THEN
                RAISE EXCEPTION 'Cannot change role to admin: Teacher record has dependent data.';
            ELSE
                DELETE FROM public.teachers WHERE id = NEW.id;
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_sync_role_extensions ON public.profiles;
CREATE TRIGGER tr_sync_role_extensions
    AFTER UPDATE OF role ON public.profiles
    FOR EACH ROW
    WHEN (OLD.role IS DISTINCT FROM NEW.role)
    EXECUTE FUNCTION public.sync_role_extensions();


-- ==============================================================================
-- 3. Fix Disconnected Curriculum Hierarchy
-- ==============================================================================

DO $$
DECLARE
    v_world_id uuid;
    v_unit_id uuid;
    v_quest_id uuid;
    v_lesson_1_id uuid;
    v_lesson_2_id uuid;
BEGIN
    -- 3.1 Fetch the existing Vocabulary Forest world
    SELECT id INTO v_world_id FROM public.worlds WHERE title = 'Vocabulary Forest' LIMIT 1;
    
    IF v_world_id IS NULL THEN
        RAISE EXCEPTION 'Vocabulary Forest world not found.';
    END IF;

    -- 3.2 Create Unit
    INSERT INTO public.units (world_id, title, description, order_index)
    VALUES (v_world_id, 'Discover Animals', 'Learn about amazing animals in the wild!', 1)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_unit_id;

    -- If conflict DO NOTHING didn't return, fetch it
    IF v_unit_id IS NULL THEN
        SELECT id INTO v_unit_id FROM public.units WHERE title = 'Discover Animals' AND world_id = v_world_id LIMIT 1;
    END IF;

    -- 3.3 Create Quest
    INSERT INTO public.quests (unit_id, title, description, difficulty, xp_reward, order_index)
    VALUES (v_unit_id, 'Animal Explorer', 'Complete the animal challenges to become an explorer.', 1, 100, 1)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_quest_id;

    IF v_quest_id IS NULL THEN
        SELECT id INTO v_quest_id FROM public.quests WHERE title = 'Animal Explorer' AND unit_id = v_unit_id LIMIT 1;
    END IF;

    -- 3.4 Link the two existing draft lessons
    SELECT id INTO v_lesson_1_id FROM public.lessons WHERE title = 'Animals and Nature' LIMIT 1;
    SELECT id INTO v_lesson_2_id FROM public.lessons WHERE title = 'Wild Animals' LIMIT 1;

    IF v_lesson_1_id IS NOT NULL THEN
        UPDATE public.lessons 
        SET quest_id = v_quest_id, world_id = v_world_id, "order" = 1 
        WHERE id = v_lesson_1_id;
    END IF;

    IF v_lesson_2_id IS NOT NULL THEN
        UPDATE public.lessons 
        SET quest_id = v_quest_id, world_id = v_world_id, "order" = 2 
        WHERE id = v_lesson_2_id;
    END IF;

    -- ==============================================================================
    -- 5. Generate Pilot Lesson Blocks
    -- ==============================================================================
    
    -- Insert minimal blocks for Lesson 1
    IF v_lesson_1_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.lesson_blocks WHERE lesson_id = v_lesson_1_id) THEN
        INSERT INTO public.lesson_blocks (lesson_id, block_type, position, configuration_json)
        VALUES 
            (v_lesson_1_id, 'text', 1, '{"content": "Welcome to Animals and Nature! Let''s learn."}'::jsonb),
            (v_lesson_1_id, 'image', 2, '{"url": "https://example.com/animal.jpg", "alt": "A friendly animal"}'::jsonb),
            (v_lesson_1_id, 'quiz', 3, '{"question": "What is this animal?"}'::jsonb),
            (v_lesson_1_id, 'text', 4, '{"content": "Great job completing this lesson!"}'::jsonb);
    END IF;

    -- Insert minimal blocks for Lesson 2
    IF v_lesson_2_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.lesson_blocks WHERE lesson_id = v_lesson_2_id) THEN
        INSERT INTO public.lesson_blocks (lesson_id, block_type, position, configuration_json)
        VALUES 
            (v_lesson_2_id, 'text', 1, '{"content": "Let''s explore Wild Animals!"}'::jsonb),
            (v_lesson_2_id, 'image', 2, '{"url": "https://example.com/lion.jpg", "alt": "A wild lion"}'::jsonb),
            (v_lesson_2_id, 'quiz', 3, '{"question": "Where does the lion live?"}'::jsonb),
            (v_lesson_2_id, 'text', 4, '{"content": "You are a wild animal expert!"}'::jsonb);
    END IF;
    
END $$;


-- ==============================================================================
-- 4. Publishing Integrity Validation
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.validate_lesson_publish()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    v_unit_id uuid;
    v_world_id uuid;
    v_block_count int;
BEGIN
    IF NEW.status = 'published' AND (OLD.status IS DISTINCT FROM 'published') THEN
        -- 1. Verify Quest link
        IF NEW.quest_id IS NULL THEN
            RAISE EXCEPTION 'Cannot publish lesson: quest_id is missing.';
        END IF;

        -- 2. Verify Unit link
        SELECT unit_id INTO v_unit_id FROM public.quests WHERE id = NEW.quest_id;
        IF v_unit_id IS NULL THEN
            RAISE EXCEPTION 'Cannot publish lesson: quest is not linked to a unit.';
        END IF;

        -- 3. Verify World link
        SELECT world_id INTO v_world_id FROM public.units WHERE id = v_unit_id;
        IF v_world_id IS NULL THEN
            RAISE EXCEPTION 'Cannot publish lesson: unit is not linked to a world.';
        END IF;
        
        -- Enforce consistency on the lesson's own world_id denormalization
        IF NEW.world_id IS DISTINCT FROM v_world_id THEN
            NEW.world_id = v_world_id;
        END IF;

        -- 4. Verify Blocks exist
        SELECT count(*) INTO v_block_count FROM public.lesson_blocks WHERE lesson_id = NEW.id;
        IF v_block_count = 0 THEN
            RAISE EXCEPTION 'Cannot publish lesson: must contain at least one lesson block.';
        END IF;
        
        -- 5. Set published timestamp
        IF NEW.published_at IS NULL THEN
            NEW.published_at = NOW();
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_validate_lesson_publish ON public.lessons;
CREATE TRIGGER tr_validate_lesson_publish
    BEFORE UPDATE OF status ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_lesson_publish();


-- Now formally attempt to publish the pilot lessons (trigger will validate them!)
UPDATE public.lessons 
SET status = 'published' 
WHERE title IN ('Animals and Nature', 'Wild Animals');


COMMIT;
