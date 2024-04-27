// supabaseClient.jsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltvtkdwatimgbhhekwux.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dnRrZHdhdGltZ2JoaGVrd3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDE4MjUsImV4cCI6MjAyOTY3NzgyNX0.1sef3Dv9v1DKlM-mQwDkI_ou4vg0CAb1rU9_OHudFO4'; // Replace with your Supabase key
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
