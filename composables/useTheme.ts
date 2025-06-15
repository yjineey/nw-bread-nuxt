import { useColorMode } from '@vueuse/core'

export const useTheme = () => {
  const mode = useColorMode({
    storageKey: 'app-theme', // 로컬스토리지 키
    initialValue: 'light', // 로컬스토리지 값이 없을 때 기본값
    emitAuto: true, // mode가 'auto'일 경우 시스템 테마 자동 감지
  })

  if (!mode.value || mode.value === 'auto') mode.value = 'light'

  return {
    mode,
    isDark: computed(() => mode.value === 'dark'),
    isLight: computed(() => mode.value === 'light'),
    isAuto: computed(() => mode.value === 'auto'),
  }
}
