export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      avatar_items: {
        Row: {
          category: string
          id: string
          name: string
          price: number
        }
        Insert: {
          category: string
          id?: string
          name: string
          price?: number
        }
        Update: {
          category?: string
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      badges: {
        Row: {
          description: string | null
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          description?: string | null
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      block_progress: {
        Row: {
          attempts: number | null
          completed: boolean | null
          id: string
          lesson_block_id: string
          score: number | null
          student_id: string
        }
        Insert: {
          attempts?: number | null
          completed?: boolean | null
          id?: string
          lesson_block_id: string
          score?: number | null
          student_id: string
        }
        Update: {
          attempts?: number | null
          completed?: boolean | null
          id?: string
          lesson_block_id?: string
          score?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "block_progress_lesson_block_id_fkey"
            columns: ["lesson_block_id"]
            isOneToOne: false
            referencedRelation: "lesson_blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "block_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_name: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_name: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_name?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      events_y2026m06: {
        Row: {
          created_at: string
          event_data: Json | null
          event_name: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_name: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_name?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          created_at: string
          duration: number | null
          game_type: string
          id: string
          score: number | null
          student_id: string
        }
        Insert: {
          created_at?: string
          duration?: number | null
          game_type: string
          id?: string
          score?: number | null
          student_id: string
        }
        Update: {
          created_at?: string
          duration?: number | null
          game_type?: string
          id?: string
          score?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_stories: {
        Row: {
          created_at: string
          generated_words: Json | null
          id: string
          story_text: string
          student_id: string
          title: string
        }
        Insert: {
          created_at?: string
          generated_words?: Json | null
          id?: string
          story_text: string
          student_id: string
          title: string
        }
        Update: {
          created_at?: string
          generated_words?: Json | null
          id?: string
          story_text?: string
          student_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_stories_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_blocks: {
        Row: {
          block_type: Database["public"]["Enums"]["block_type"]
          configuration_json: Json
          id: string
          lesson_id: string
          position: number
        }
        Insert: {
          block_type: Database["public"]["Enums"]["block_type"]
          configuration_json?: Json
          id?: string
          lesson_id: string
          position?: number
        }
        Update: {
          block_type?: Database["public"]["Enums"]["block_type"]
          configuration_json?: Json
          id?: string
          lesson_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "lesson_blocks_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "content_performance"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_blocks_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          completion_percent: number | null
          id: string
          lesson_id: string
          score: number | null
          started_at: string | null
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_percent?: number | null
          id?: string
          lesson_id: string
          score?: number | null
          started_at?: string | null
          student_id: string
        }
        Update: {
          completed_at?: string | null
          completion_percent?: number | null
          id?: string
          lesson_id?: string
          score?: number | null
          started_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "content_performance"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          estimated_minutes: number | null
          id: string
          language: string
          published_at: string | null
          quest_id: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          language?: string
          published_at?: string | null
          quest_id: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          language?: string
          published_at?: string | null
          quest_id?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_reports: {
        Row: {
          generated_at: string
          id: string
          lessons_completed: number | null
          pronunciation_score: number | null
          student_id: string
          weekly_xp: number | null
        }
        Insert: {
          generated_at?: string
          id?: string
          lessons_completed?: number | null
          pronunciation_score?: number | null
          student_id: string
          weekly_xp?: number | null
        }
        Update: {
          generated_at?: string
          id?: string
          lessons_completed?: number | null
          pronunciation_score?: number | null
          student_id?: string
          weekly_xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parent_reports_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_student_links: {
        Row: {
          id: string
          parent_id: string
          student_id: string
        }
        Insert: {
          id?: string
          parent_id: string
          student_id: string
        }
        Update: {
          id?: string
          parent_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_student_links_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parent_student_links_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parents_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          language: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          language?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          language?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      pronunciation_attempts: {
        Row: {
          audio_url: string | null
          created_at: string
          id: string
          score: number
          student_id: string
          word: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id?: string
          score: number
          student_id: string
          word: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: string
          score?: number
          student_id?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "pronunciation_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      quests: {
        Row: {
          description: string | null
          difficulty: number
          id: string
          order_index: number
          title: string
          unit_id: string
          xp_reward: number
        }
        Insert: {
          description?: string | null
          difficulty?: number
          id?: string
          order_index?: number
          title: string
          unit_id: string
          xp_reward?: number
        }
        Update: {
          description?: string | null
          difficulty?: number
          id?: string
          order_index?: number
          title?: string
          unit_id?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "quests_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_answers: {
        Row: {
          answer: string
          id: string
          is_correct: boolean
          quiz_id: string
        }
        Insert: {
          answer: string
          id?: string
          is_correct?: boolean
          quiz_id: string
        }
        Update: {
          answer?: string
          id?: string
          is_correct?: boolean
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answers_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          explanation: string | null
          id: string
          lesson_block_id: string
          question: string
          xp_reward: number
        }
        Insert: {
          explanation?: string | null
          id?: string
          lesson_block_id: string
          question: string
          xp_reward?: number
        }
        Update: {
          explanation?: string | null
          id?: string
          lesson_block_id?: string
          question?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_block_id_fkey"
            columns: ["lesson_block_id"]
            isOneToOne: false
            referencedRelation: "lesson_blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      student_badges: {
        Row: {
          badge_id: string
          id: string
          student_id: string
          unlocked_at: string
        }
        Insert: {
          badge_id: string
          id?: string
          student_id: string
          unlocked_at?: string
        }
        Update: {
          badge_id?: string
          id?: string
          student_id?: string
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_inventory: {
        Row: {
          id: string
          item_id: string
          student_id: string
        }
        Insert: {
          id?: string
          item_id: string
          student_id: string
        }
        Update: {
          id?: string
          item_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "avatar_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_inventory_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: number | null
          current_quest: string | null
          current_unit: string | null
          current_world: string | null
          id: string
          leo_coins: number | null
          level: number | null
          streak_days: number | null
          total_xp: number | null
        }
        Insert: {
          age?: number | null
          current_quest?: string | null
          current_unit?: string | null
          current_world?: string | null
          id: string
          leo_coins?: number | null
          level?: number | null
          streak_days?: number | null
          total_xp?: number | null
        }
        Update: {
          age?: number | null
          current_quest?: string | null
          current_unit?: string | null
          current_world?: string | null
          id?: string
          leo_coins?: number | null
          level?: number | null
          streak_days?: number | null
          total_xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_conversations: {
        Row: {
          created_at: string
          id: string
          student_id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          student_id: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          student_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_conversations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["message_role"]
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["message_role"]
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["message_role"]
        }
        Relationships: [
          {
            foreignKeyName: "tutor_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "tutor_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          description: string | null
          id: string
          order_index: number
          title: string
          world_id: string
        }
        Insert: {
          description?: string | null
          id?: string
          order_index?: number
          title: string
          world_id: string
        }
        Update: {
          description?: string | null
          id?: string
          order_index?: number
          title?: string
          world_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_world_id_fkey"
            columns: ["world_id"]
            isOneToOne: false
            referencedRelation: "worlds"
            referencedColumns: ["id"]
          },
        ]
      }
      vocabulary_memory: {
        Row: {
          id: string
          language: string
          last_seen: string
          mastery_score: number | null
          student_id: string
          word: string
        }
        Insert: {
          id?: string
          language: string
          last_seen?: string
          mastery_score?: number | null
          student_id: string
          word: string
        }
        Update: {
          id?: string
          language?: string
          last_seen?: string
          mastery_score?: number | null
          student_id?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "vocabulary_memory_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      worlds: {
        Row: {
          description: string | null
          icon: string | null
          id: string
          order_index: number
          title: string
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      xp_transactions: {
        Row: {
          created_at: string
          id: string
          source_id: string | null
          source_type: Database["public"]["Enums"]["xp_source"]
          student_id: string
          xp_amount: number
        }
        Insert: {
          created_at?: string
          id?: string
          source_id?: string | null
          source_type: Database["public"]["Enums"]["xp_source"]
          student_id: string
          xp_amount: number
        }
        Update: {
          created_at?: string
          id?: string
          source_id?: string | null
          source_type?: Database["public"]["Enums"]["xp_source"]
          student_id?: string
          xp_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "xp_transactions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      ai_insights: {
        Row: {
          recommendation: string | null
          severity: string | null
          trend: string | null
        }
        Relationships: []
      }
      content_performance: {
        Row: {
          avg_duration: number | null
          avg_score: number | null
          completion_rate: number | null
          lesson_id: string | null
          title: string | null
        }
        Relationships: []
      }
      dashboard_metrics: {
        Row: {
          active_students: number | null
          average_session_time: number | null
          daily_active_users: number | null
          lessons_completed_today: number | null
          total_xp_today: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      block_type:
        | "text"
        | "image"
        | "audio"
        | "video"
        | "quiz"
        | "pronunciation"
        | "speaking"
        | "flashcard"
        | "drag_drop"
        | "memory_game"
      content_status: "draft" | "published" | "archived"
      message_role: "user" | "assistant"
      user_role: "student" | "parent" | "teacher" | "admin"
      xp_source: "lesson" | "quiz" | "challenge" | "achievement"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      block_type: [
        "text",
        "image",
        "audio",
        "video",
        "quiz",
        "pronunciation",
        "speaking",
        "flashcard",
        "drag_drop",
        "memory_game",
      ],
      content_status: ["draft", "published", "archived"],
      message_role: ["user", "assistant"],
      user_role: ["student", "parent", "teacher", "admin"],
      xp_source: ["lesson", "quiz", "challenge", "achievement"],
    },
  },
} as const
