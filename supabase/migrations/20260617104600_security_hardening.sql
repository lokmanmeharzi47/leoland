-- Task 1: Security Hardening
-- Revoke execution from public, anon, and authenticated
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- Convert to SECURITY INVOKER
ALTER FUNCTION public.rls_auto_enable() SECURITY INVOKER;
