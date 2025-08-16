export interface User {
  name: string;
  id: number;
  experience: number;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth?: {
    user: User | null;
  };
};
