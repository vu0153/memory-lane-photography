/* Public client configuration. Publishable/anon keys are safe to include in front-end code;
 * never put a Supabase secret or service-role key in this file.
 * Every Cloudflare branch preview uses isolated staging. main/custom domain stay on production.
 */
const memoryLaneIsBranchPreview = window.location.hostname.endsWith(".memory-lane-photography.pages.dev") &&
  window.location.hostname !== "memory-lane-photography.pages.dev";
window.memoryLaneIsBranchPreview = memoryLaneIsBranchPreview;
const supabaseUrl = memoryLaneIsBranchPreview
  ? "https://livorstsjtixdgksuzou.supabase.co"
  : "https://dwqnbzugacobmmjbcswr.supabase.co";
const supabaseAnonKey = memoryLaneIsBranchPreview
  ? "sb_publishable_wa0Vy9qJUGBSnaPI8gYdmg_8R6suWg_"
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cW5ienVnYWNvYm1tamJjc3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzA3MzEsImV4cCI6MjA5NDc0NjczMX0.aVZwstAtaEXBznr7hhxKlKgLvb0ffvVhxZBkfoyBsOs";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
