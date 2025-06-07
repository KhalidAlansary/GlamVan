export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          address: string | null;
          beautician: string | null;
          client: string;
          created_at: string | null;
          date: string;
          id: string;
          location: string;
          payment: string | null;
          payment_status: string | null;
          phone: string | null;
          price: string | null;
          service: string;
          status: string;
          time: string;
          updated_at: string | null;
          van: string | null;
        };
        Insert: {
          address?: string | null;
          beautician?: string | null;
          client: string;
          created_at?: string | null;
          date: string;
          id: string;
          location: string;
          payment?: string | null;
          payment_status?: string | null;
          phone?: string | null;
          price?: string | null;
          service: string;
          status?: string;
          time: string;
          updated_at?: string | null;
          van?: string | null;
        };
        Update: {
          address?: string | null;
          beautician?: string | null;
          client?: string;
          created_at?: string | null;
          date?: string;
          id?: string;
          location?: string;
          payment?: string | null;
          payment_status?: string | null;
          phone?: string | null;
          price?: string | null;
          service?: string;
          status?: string;
          time?: string;
          updated_at?: string | null;
          van?: string | null;
        };
        Relationships: [];
      };
      location_to_van_mapping: {
        Row: {
          id: number;
          location: string;
          van_id: number | null;
        };
        Insert: {
          id?: number;
          location: string;
          van_id?: number | null;
        };
        Update: {
          id?: number;
          location?: string;
          van_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Location to Van Mapping_van_id_fkey";
            columns: ["van_id"];
            isOneToOne: false;
            referencedRelation: "vans";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          amount: string;
          booking_id: string | null;
          client: string;
          created_at: string | null;
          date: string;
          id: string;
          method: string;
          service: string | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          amount: string;
          booking_id?: string | null;
          client: string;
          created_at?: string | null;
          date: string;
          id: string;
          method: string;
          service?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          amount?: string;
          booking_id?: string | null;
          client?: string;
          created_at?: string | null;
          date?: string;
          id?: string;
          method?: string;
          service?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      promotions: {
        Row: {
          code: string;
          created_at: string | null;
          description: string | null;
          discount: string;
          id: number;
          status: string | null;
          updated_at: string | null;
          usage_limit: number | null;
          used_count: number | null;
          valid_until: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          description?: string | null;
          discount: string;
          id?: number;
          status?: string | null;
          updated_at?: string | null;
          usage_limit?: number | null;
          used_count?: number | null;
          valid_until?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          description?: string | null;
          discount?: string;
          id?: number;
          status?: string | null;
          updated_at?: string | null;
          usage_limit?: number | null;
          used_count?: number | null;
          valid_until?: string | null;
        };
        Relationships: [];
      };
      refunds: {
        Row: {
          amount: string;
          client: string;
          created_at: string | null;
          date: string;
          id: string;
          original_payment: string | null;
          reason: string | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          amount: string;
          client: string;
          created_at?: string | null;
          date: string;
          id: string;
          original_payment?: string | null;
          reason?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          amount?: string;
          client?: string;
          created_at?: string | null;
          date?: string;
          id?: string;
          original_payment?: string | null;
          reason?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      services: {
        Row: {
          category: string;
          description: string | null;
          icon: string | null;
          id: number;
          image: string | null;
          link: string | null;
          price: string | null;
          title: string | null;
        };
        Insert: {
          category: string;
          description?: string | null;
          icon?: string | null;
          id?: number;
          image?: string | null;
          link?: string | null;
          price?: string | null;
          title?: string | null;
        };
        Update: {
          category?: string;
          description?: string | null;
          icon?: string | null;
          id?: number;
          image?: string | null;
          link?: string | null;
          price?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      stylists: {
        Row: {
          bookings_completed: number[] | null;
          created_at: string | null;
          experience: string | null;
          id: number;
          image: string | null;
          name: string;
          phone: string | null;
          rating: number | null;
          specialties: string[] | null;
          status: string | null;
          updated_at: string | null;
          work_zones: string[] | null;
        };
        Insert: {
          bookings_completed?: number[] | null;
          created_at?: string | null;
          experience?: string | null;
          id?: number;
          image?: string | null;
          name: string;
          phone?: string | null;
          rating?: number | null;
          specialties?: string[] | null;
          status?: string | null;
          updated_at?: string | null;
          work_zones?: string[] | null;
        };
        Update: {
          bookings_completed?: number[] | null;
          created_at?: string | null;
          experience?: string | null;
          id?: number;
          image?: string | null;
          name?: string;
          phone?: string | null;
          rating?: number | null;
          specialties?: string[] | null;
          status?: string | null;
          updated_at?: string | null;
          work_zones?: string[] | null;
        };
        Relationships: [];
      };
      vans: {
        Row: {
          capacity: string | null;
          driver: string | null;
          id: number;
          last_service: string | null;
          location: string | null;
          name: string;
          status: string | null;
        };
        Insert: {
          capacity?: string | null;
          driver?: string | null;
          id?: number;
          last_service?: string | null;
          location?: string | null;
          name: string;
          status?: string | null;
        };
        Update: {
          capacity?: string | null;
          driver?: string | null;
          id?: number;
          last_service?: string | null;
          location?: string | null;
          name?: string;
          status?: string | null;
        };
        Relationships: [];
      };
      wedding_contracts: {
        Row: {
          client: string;
          contract_status: string | null;
          created_at: string | null;
          date: string;
          deposit: string | null;
          id: string;
          location: string;
          package: string;
          payment_status: string | null;
          total_amount: string;
          updated_at: string | null;
        };
        Insert: {
          client: string;
          contract_status?: string | null;
          created_at?: string | null;
          date: string;
          deposit?: string | null;
          id: string;
          location: string;
          package: string;
          payment_status?: string | null;
          total_amount: string;
          updated_at?: string | null;
        };
        Update: {
          client?: string;
          contract_status?: string | null;
          created_at?: string | null;
          date?: string;
          deposit?: string | null;
          id?: string;
          location?: string;
          package?: string;
          payment_status?: string | null;
          total_amount?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
