export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            destinations: {
                Row: {
                    id: string
                    name: string
                    city: string | null
                    description: string | null
                    theme_vibe: string | null
                    theme_tags: string[] | null
                    location_coords: unknown | null // PostGIS types are often handled as strings or custom objects, simple unknown for now to avoid errors
                    embedding: string | null // Vector is returned as string by Supabase JS usually, or number[] if cast
                    crowd_status: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    city?: string | null
                    description?: string | null
                    theme_vibe?: string | null
                    theme_tags?: string[] | null
                    location_coords?: unknown | null
                    embedding?: string | number[] | null
                    crowd_status?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    city?: string | null
                    description?: string | null
                    theme_vibe?: string | null
                    theme_tags?: string[] | null
                    location_coords?: unknown | null
                    embedding?: string | number[] | null
                    crowd_status?: number | null
                    created_at?: string
                }
            }
            shopkeepers: {
                Row: {
                    id: string
                    user_id: string
                    shop_name: string
                    promo_code: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    shop_name: string
                    promo_code: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    shop_name?: string
                    promo_code?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            promo_usages: {
                Row: {
                    id: string
                    promo_code: string
                    shopkeeper_id: string
                    user_id: string
                    username: string
                    is_paid: boolean
                    applied_at: string
                    paid_at: string | null
                }
                Insert: {
                    id?: string
                    promo_code: string
                    shopkeeper_id: string
                    user_id: string
                    username: string
                    is_paid?: boolean
                    applied_at?: string
                    paid_at?: string | null
                }
                Update: {
                    id?: string
                    promo_code?: string
                    shopkeeper_id?: string
                    user_id?: string
                    username?: string
                    is_paid?: boolean
                    applied_at?: string
                    paid_at?: string | null
                }
            }

            Row: {
                id: string
                updated_at: string | null
                full_name: string | null
                avatar_url: string | null
                website: string | null
                role: string | null
            }
            Insert: {
                id: string
                updated_at?: string | null
                full_name?: string | null
                avatar_url?: string | null
                website?: string | null
                role?: string | null
            }
            Update: {
                id?: string
                updated_at?: string | null
                full_name?: string | null
                avatar_url?: string | null
                website?: string | null
                role?: string | null
            }
            guides: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    place: string
                    qualification: string
                    experience: string | null
                    languages_known: string | null
                    verified: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    place: string
                    qualification: string
                    experience?: string | null
                    languages_known?: string | null
                    verified?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    place?: string
                    qualification?: string
                    experience?: string | null
                    languages_known?: string | null
                    verified?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            tours: {
                Row: {
                    id: string
                    guide_id: string
                    tour_name: string
                    location: string
                    places_covered: string[]
                    description: string
                    duration: string
                    max_participants: number
                    start_date: string
                    end_date: string
                    status: 'OPEN' | 'CLOSED' | 'CANCELLED'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    guide_id: string
                    tour_name: string
                    location: string
                    places_covered: string[]
                    description: string
                    duration: string
                    max_participants?: number
                    start_date: string
                    end_date: string
                    status?: 'OPEN' | 'CLOSED' | 'CANCELLED'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    guide_id?: string
                    tour_name?: string
                    location?: string
                    places_covered?: string[]
                    description?: string
                    duration?: string
                    max_participants?: number
                    start_date?: string
                    end_date?: string
                    status?: 'OPEN' | 'CLOSED' | 'CANCELLED'
                    created_at?: string
                    updated_at?: string
                }
            }
            tour_enrollments: {
                Row: {
                    id: string
                    tour_id: string
                    user_id: string
                    username: string
                    enrollment_status: 'INTERESTED' | 'CONFIRMED' | 'CANCELLED'
                    enrolled_at: string
                }
                Insert: {
                    id?: string
                    tour_id: string
                    user_id: string
                    username: string
                    enrollment_status?: 'INTERESTED' | 'CONFIRMED' | 'CANCELLED'
                    enrolled_at?: string
                }
                Update: {
                    id?: string
                    tour_id?: string
                    user_id?: string
                    username?: string
                    enrollment_status?: 'INTERESTED' | 'CONFIRMED' | 'CANCELLED'
                    enrolled_at?: string
                }
            }
            user_interests: {
                Row: {
                    id: string
                    user_id: string
                    interest: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    interest: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    interest?: string
                    created_at?: string
                }
            }
        }
        Functions: {
            match_destinations: {
                Args: {
                    query_embedding: number[] | string
                    match_threshold: number
                    match_count: number
                }
                Returns: {
                    id: string
                    name: string
                    city: string
                    description: string
                    theme_vibe: string
                    similarity: number
                }[]
            }
        }
    }
}
