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
    PostgrestVersion: "14.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agencies: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          arla_membership_number: string | null
          brand_colour: string | null
          city: string | null
          county: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          postcode: string | null
          propertymark_number: string | null
          subscription_status: string
          subscription_tier: string
          updated_at: string
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          arla_membership_number?: string | null
          brand_colour?: string | null
          city?: string | null
          county?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          postcode?: string | null
          propertymark_number?: string | null
          subscription_status?: string
          subscription_tier?: string
          updated_at?: string
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          arla_membership_number?: string | null
          brand_colour?: string | null
          city?: string | null
          county?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          postcode?: string | null
          propertymark_number?: string | null
          subscription_status?: string
          subscription_tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      attachments: {
        Row: {
          agency_id: string
          created_at: string
          entity_id: string
          entity_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          agency_id: string
          created_at?: string
          entity_id: string
          entity_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          agency_id?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          agency_id: string
          certificate_type: string
          created_at: string
          expiry_date: string | null
          file_name: string | null
          file_url: string | null
          id: string
          issued_date: string | null
          notes: string | null
          property_id: string
          reference_number: string | null
          reminder_days_before: number
          reminder_sent_at: string | null
          status: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          agency_id: string
          certificate_type: string
          created_at?: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          issued_date?: string | null
          notes?: string | null
          property_id: string
          reference_number?: string | null
          reminder_days_before?: number
          reminder_sent_at?: string | null
          status?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          agency_id?: string
          certificate_type?: string
          created_at?: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          issued_date?: string | null
          notes?: string | null
          property_id?: string
          reference_number?: string | null
          reminder_days_before?: number
          reminder_sent_at?: string | null
          status?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          agency_id: string
          ai_confidence: number | null
          assigned_to: string | null
          category: string | null
          created_at: string
          email_account_id: string | null
          external_thread_id: string | null
          id: string
          is_read: boolean
          last_message_at: string | null
          message_count: number
          property_id: string | null
          status: string
          subject: string | null
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          agency_id: string
          ai_confidence?: number | null
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          email_account_id?: string | null
          external_thread_id?: string | null
          id?: string
          is_read?: boolean
          last_message_at?: string | null
          message_count?: number
          property_id?: string | null
          status?: string
          subject?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          agency_id?: string
          ai_confidence?: number | null
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          email_account_id?: string | null
          external_thread_id?: string | null
          id?: string
          is_read?: boolean
          last_message_at?: string | null
          message_count?: number
          property_id?: string | null
          status?: string
          subject?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      email_accounts: {
        Row: {
          access_token: string | null
          agency_id: string
          connected_by: string | null
          created_at: string
          email_address: string
          id: string
          label: string | null
          last_synced_at: string | null
          provider: string
          refresh_token: string | null
          sync_error: string | null
          sync_status: string
          token_expires_at: string | null
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          agency_id: string
          connected_by?: string | null
          created_at?: string
          email_address: string
          id?: string
          label?: string | null
          last_synced_at?: string | null
          provider: string
          refresh_token?: string | null
          sync_error?: string | null
          sync_status?: string
          token_expires_at?: string | null
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          agency_id?: string
          connected_by?: string | null
          created_at?: string
          email_address?: string
          id?: string
          label?: string | null
          last_synced_at?: string | null
          provider?: string
          refresh_token?: string | null
          sync_error?: string | null
          sync_status?: string
          token_expires_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_accounts_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      landlords: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          agency_id: string
          city: string | null
          county: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          postcode: string | null
          updated_at: string
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          agency_id: string
          city?: string | null
          county?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          postcode?: string | null
          updated_at?: string
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          agency_id?: string
          city?: string | null
          county?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          postcode?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "landlords_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_jobs: {
        Row: {
          agency_id: string
          completed_date: string | null
          contractor_email: string | null
          contractor_name: string | null
          contractor_phone: string | null
          conversation_id: string | null
          cost_approved_at: string | null
          cost_approved_by: string | null
          created_at: string
          description: string | null
          final_cost: number | null
          id: string
          notes: string | null
          priority: string
          property_id: string | null
          quoted_cost: number | null
          reported_by: string | null
          scheduled_date: string | null
          status: string
          tenant_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          completed_date?: string | null
          contractor_email?: string | null
          contractor_name?: string | null
          contractor_phone?: string | null
          conversation_id?: string | null
          cost_approved_at?: string | null
          cost_approved_by?: string | null
          created_at?: string
          description?: string | null
          final_cost?: number | null
          id?: string
          notes?: string | null
          priority?: string
          property_id?: string | null
          quoted_cost?: number | null
          reported_by?: string | null
          scheduled_date?: string | null
          status?: string
          tenant_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          completed_date?: string | null
          contractor_email?: string | null
          contractor_name?: string | null
          contractor_phone?: string | null
          conversation_id?: string | null
          cost_approved_at?: string | null
          cost_approved_by?: string | null
          created_at?: string
          description?: string | null
          final_cost?: number | null
          id?: string
          notes?: string | null
          priority?: string
          property_id?: string | null
          quoted_cost?: number | null
          reported_by?: string | null
          scheduled_date?: string | null
          status?: string
          tenant_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_jobs_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_jobs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_jobs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          agency_id: string
          body_html: string | null
          body_text: string | null
          cc_addresses: string[] | null
          conversation_id: string
          created_at: string
          direction: string
          external_message_id: string | null
          from_address: string | null
          id: string
          is_read: boolean
          sent_at: string | null
          subject: string | null
          to_addresses: string[] | null
        }
        Insert: {
          agency_id: string
          body_html?: string | null
          body_text?: string | null
          cc_addresses?: string[] | null
          conversation_id: string
          created_at?: string
          direction: string
          external_message_id?: string | null
          from_address?: string | null
          id?: string
          is_read?: boolean
          sent_at?: string | null
          subject?: string | null
          to_addresses?: string[] | null
        }
        Update: {
          agency_id?: string
          body_html?: string | null
          body_text?: string | null
          cc_addresses?: string[] | null
          conversation_id?: string
          created_at?: string
          direction?: string
          external_message_id?: string | null
          from_address?: string | null
          id?: string
          is_read?: boolean
          sent_at?: string | null
          subject?: string | null
          to_addresses?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_log: {
        Row: {
          agency_id: string
          body: string | null
          channel: string
          created_at: string
          delivered_at: string | null
          dismissed_at: string | null
          entity_id: string | null
          entity_type: string | null
          event_type: string
          failed_at: string | null
          failure_reason: string | null
          id: string
          read_at: string | null
          recipient_id: string
          title: string
        }
        Insert: {
          agency_id: string
          body?: string | null
          channel: string
          created_at?: string
          delivered_at?: string | null
          dismissed_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          event_type: string
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          read_at?: string | null
          recipient_id: string
          title: string
        }
        Update: {
          agency_id?: string
          body?: string | null
          channel?: string
          created_at?: string
          delivered_at?: string | null
          dismissed_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          read_at?: string | null
          recipient_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          agency_id: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          agency_id: string
          bathrooms: number | null
          bedrooms: number | null
          city: string
          county: string | null
          created_at: string
          id: string
          landlord_id: string | null
          postcode: string
          property_type: string
          status: string
          updated_at: string
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          agency_id: string
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          county?: string | null
          created_at?: string
          id?: string
          landlord_id?: string | null
          postcode: string
          property_type?: string
          status?: string
          updated_at?: string
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          agency_id?: string
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          county?: string | null
          created_at?: string
          id?: string
          landlord_id?: string | null
          postcode?: string
          property_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "landlords"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          agency_id: string
          created_at: string
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          property_id: string | null
          status: string
          tenancy_end_date: string | null
          tenancy_start_date: string | null
          updated_at: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          property_id?: string | null
          status?: string
          tenancy_end_date?: string | null
          tenancy_start_date?: string | null
          updated_at?: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          property_id?: string | null
          status?: string
          tenancy_end_date?: string | null
          tenancy_start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenants_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
