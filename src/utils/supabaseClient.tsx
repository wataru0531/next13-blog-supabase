/**************************************************************



***************************************************************/
import { createClient } from '@supabase/supabase-js'

// !...末尾に！がなければエラーが出る。
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 環境変数を使えばなぜか動かない...
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});

// export const supabase = createClient(
//   "https://oluzakismfbnprnnkmsl.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXpha2lzbWZibnBybm5rbXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxOTc4ODAsImV4cCI6MjAxMDc3Mzg4MH0.mO1_76qh5jGQ06dSdynOzANklepkbFHQ_zgBK5ePL0o",
//   {
//     auth: {
//       persistSession: false,
//     }
//   },
  
// );

// console.log(supabase);




