
-- profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  hero_name text NOT NULL DEFAULT 'Wędrowiec',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- user_progress
CREATE TABLE public.user_progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp integer NOT NULL DEFAULT 0,
  xp_today integer NOT NULL DEFAULT 0,
  today_key text NOT NULL DEFAULT to_char(now(), 'YYYY-MM-DD'),
  streak integer NOT NULL DEFAULT 0,
  last_active text NOT NULL DEFAULT '',
  hero_name text NOT NULL DEFAULT 'Wędrowiec',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own progress all" ON public.user_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_favorites
CREATE TABLE public.user_favorites (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, word_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_favorites TO authenticated;
GRANT ALL ON public.user_favorites TO service_role;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own favorites all" ON public.user_favorites FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_achievements
CREATE TABLE public.user_achievements (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, achievement)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_achievements TO authenticated;
GRANT ALL ON public.user_achievements TO service_role;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own ach all" ON public.user_achievements FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_quests
CREATE TABLE public.user_quests (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  today_key text NOT NULL DEFAULT to_char(now(), 'YYYY-MM-DD'),
  learn_words integer NOT NULL DEFAULT 0,
  play_game integer NOT NULL DEFAULT 0,
  grammar_drill integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_quests TO authenticated;
GRANT ALL ON public.user_quests TO service_role;
ALTER TABLE public.user_quests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own quests all" ON public.user_quests FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_best_scores
CREATE TABLE public.user_best_scores (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, game_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_best_scores TO authenticated;
GRANT ALL ON public.user_best_scores TO service_role;
ALTER TABLE public.user_best_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own scores all" ON public.user_best_scores FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_kingdoms
CREATE TABLE public.user_kingdoms (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_slug text NOT NULL,
  cleared boolean NOT NULL DEFAULT false,
  best_score integer NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 0,
  boss_defeated boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, case_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_kingdoms TO authenticated;
GRANT ALL ON public.user_kingdoms TO service_role;
ALTER TABLE public.user_kingdoms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own kingdoms all" ON public.user_kingdoms FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- trigger to create profile + progress on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  INSERT INTO public.user_progress (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  INSERT INTO public.user_quests (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_favorites;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_achievements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_quests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_best_scores;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_kingdoms;

ALTER TABLE public.user_progress REPLICA IDENTITY FULL;
ALTER TABLE public.user_favorites REPLICA IDENTITY FULL;
ALTER TABLE public.user_achievements REPLICA IDENTITY FULL;
ALTER TABLE public.user_quests REPLICA IDENTITY FULL;
ALTER TABLE public.user_best_scores REPLICA IDENTITY FULL;
ALTER TABLE public.user_kingdoms REPLICA IDENTITY FULL;
