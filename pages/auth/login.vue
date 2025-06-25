<template>
  <div class="min-h-screen border-outline">
    <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">로그인</h1>
          <p>계정에 로그인하세요</p>
        </div>

        <div class="bg-white rounded-xl shadow-2xl p-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                placeholder="이메일을 입력하세요"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors pr-12"
                  placeholder="비밀번호를 입력하세요"
                  :class="{ 'border-red-500': errors.password }"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    v-if="!showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    ></path>
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember"
                  v-model="loginForm.remember"
                  type="checkbox"
                  class="h-4 w-4 text-theme focus:ring-theme border-gray-300 rounded transition-colors"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-700">
                  로그인 상태 유지
                </label>
              </div>
              <a
                href="#"
                class="text-sm text-theme hover:text-theme-dark transition-colors font-medium"
              >
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
            >
              <span v-if="!isLoading" class="text-gray-800">로그인</span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                로그인 중...
              </span>
            </button>

            <div v-if="loginError" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p class="text-sm text-red-600">{{ loginError }}</p>
              </div>
            </div>
          </form>

          <div class="mt-8">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-800">또는</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                class="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-theme focus:ring-offset-2 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-theme focus:ring-offset-2 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.750-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001"
                  />
                </svg>
                카카오
              </button>
            </div>
          </div>

          <div class="text-center mt-8">
            <p class="text-sm text-gray-600">
              계정이 없으신가요?
              <a
                href="/signup"
                class="text-theme hover:text-theme-dark font-medium transition-colors"
                >회원가입</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loginForm = ref({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

// 유효성 검사 에러
const errors = ref({
  email: '',
  password: '',
})

// 비밀번호 표시/숨기기
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 유효성 검사
const validateForm = () => {
  errors.value = { email: '', password: '' }
  let isValid = true

  // 이메일 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!loginForm.value.email) {
    errors.value.email = '이메일을 입력해주세요.'
    isValid = false
  } else if (!emailRegex.test(loginForm.value.email)) {
    errors.value.email = '올바른 이메일 형식을 입력해주세요.'
    isValid = false
  }

  // 비밀번호 검사
  if (!loginForm.value.password) {
    errors.value.password = '비밀번호를 입력해주세요.'
    isValid = false
  } else if (loginForm.value.password.length < 6) {
    errors.value.password = '비밀번호는 최소 6자 이상이어야 합니다.'
    isValid = false
  }

  return isValid
}

// 로그인 처리
const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  loginError.value = ''

  try {
    // 실제 로그인 API 호출 예시
    // const { data } = await $fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: {
    //     email: loginForm.value.email,
    //     password: loginForm.value.password,
    //     remember: loginForm.value.remember
    //   }
    // })

    // 임시 로그인 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 성공 시 리다이렉트
    await navigateTo('/dashboard')
  } catch (error: any) {
    loginError.value = error.data?.message || '로그인에 실패했습니다. 다시 시도해주세요.'
  } finally {
    isLoading.value = false
  }
}

// JSON-LD 스키마 자동 생성
// useSchemaOrg([
//   {
//     '@type': 'WebPage',
//     name: '로그인',
//     description: '계정에 로그인하여 서비스를 이용하세요.',
//     url: 'https://yoursite.com/login',
//   },
//   {
//     '@type': 'Organization',
//     name: '내 앱',
//     url: 'https://yoursite.com',
//   },
// ])

// SEO 설정
useSeoMeta({
  title: '로그인 - 내 앱',
  description: '계정에 로그인하여 서비스를 이용하세요.',
})
</script>
