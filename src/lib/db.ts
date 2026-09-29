import { createClient } from "@supabase/supabase-js";

// SuperCool managed database (public url + anon key).
const url = "https://prj998545e8513a4d092d96.databasepad.com";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNmNzRhMGJmLTVmNTQtNGM5Zi1hODExLTU2NjVhYWM0MGU1OCJ9.eyJwcm9qZWN0SWQiOiJwcmo5OTg1NDVlODUxM2E0ZDA5MmQ5NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkwNzEwODU4LCJleHAiOjIxMDYwNzA4NTgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.d38q53_e8ylCyxx_thsbBBz8DBqSXiKFwOTfS1TkQTU";

export const db = createClient(url, anonKey);
export default db;
