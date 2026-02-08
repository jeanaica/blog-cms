// In an SPA with Vite, page transitions are instant (no server round-trip).
// This hook is kept as a no-op for compatibility but always returns false.
// Individual components handle their own loading states via Apollo's useQuery.
export function usePageLoading() {
  return false;
}
