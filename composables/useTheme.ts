export type ThemeMode = 'light' | 'dark'
export type ColorScheme =
  | 'none'
  | 'pink'
  | 'orange'
  | 'emerald'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'slate'

export const colorSchemes = {
  none: { name: 'none' },
  pink: { name: '핑크', color: '#ec4899' },
  orange: { name: '오렌지', color: '#f97316' },
  emerald: { name: '에메랄드', color: '#10b981' },
  blue: { name: '블루', color: '#3b82f6' },
  indigo: { name: '인디고', color: '#6366f1' },
  purple: { name: '퍼플', color: '#8b5cf6' },
  slate: { name: '슬레이트', color: '#64748b' },
}

export const useTheme = () => {
  const themeMode = useCookie<ThemeMode>('theme-mode', {
    default: () => 'light',
  })

  const colorScheme = useCookie<ColorScheme>('color-scheme', {
    default: () => 'none',
  })

  const mode = computed(() => themeMode.value)

  const applyTheme = () => {
    if (!process.client) return

    const html = document.documentElement
    html.classList.toggle('dark', themeMode.value === 'dark')
    html.setAttribute('data-color-scheme', colorScheme.value)
  }

  const setTheme = (newMode: ThemeMode) => {
    themeMode.value = newMode
    nextTick(() => applyTheme())
  }

  const setColorScheme = (scheme: ColorScheme) => {
    colorScheme.value = scheme
    nextTick(() => applyTheme())
  }

  const toggleDark = () => {
    setTheme(themeMode.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    applyTheme()
  })

  return {
    mode,
    themeMode,
    colorScheme,
    setTheme,
    setColorScheme,
    toggleDark,
    colorSchemes,
  }
}
