export const selectIsAppReady = (state) => state?.root?.isAppReady ?? false
export const selectToken = (state) => state?.root?.token ?? null
export const selectCurrentUser = (state) => state?.root?.user ?? null
