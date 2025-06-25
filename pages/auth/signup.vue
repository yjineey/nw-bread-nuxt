<template>
  <div class="min-h-screen border-outline">
    <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">회원가입</h1>
          <p>새 계정을 만들어보세요</p>
        </div>

        <div class="bg-white rounded-xl shadow-2xl p-8">
          <form @submit.prevent="handleSignup" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2"> 이름 </label>
              <input
                id="name"
                v-model="signupForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                placeholder="이름을 입력하세요"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                id="email"
                v-model="signupForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                placeholder="이메일을 입력하세요"
                :class="{ 'border-red-500': errors.email }"
                @blur="checkEmailDuplicate"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
              <p v-if="emailChecking" class="mt-1 text-sm text-gray-500">이메일 중복 확인 중...</p>
              <p v-if="emailAvailable" class="mt-1 text-sm text-theme">
                ✓ 사용 가능한 이메일입니다
              </p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="signupForm.password"
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

              <!-- 비밀번호 강도 표시 -->
              <div v-if="signupForm.password" class="mt-2">
                <div class="flex space-x-1">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="h-1 flex-1 rounded-full"
                    :class="getPasswordStrengthColor(i)"
                  ></div>
                </div>
                <p class="text-xs mt-1" :class="passwordStrengthTextColor">
                  {{ passwordStrengthText }}
                </p>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="signupForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors pr-12"
                  placeholder="비밀번호를 다시 입력하세요"
                  :class="{ 'border-red-500': errors.confirmPassword }"
                />
                <button
                  type="button"
                  @click="toggleConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    v-if="!showConfirmPassword"
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
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword }}
              </p>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <input
                id="phone"
                v-model="signupForm.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                placeholder="010-1234-5678"
                :class="{ 'border-red-500': errors.phone }"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                {{ errors.phone }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3"> 성별 </label>
              <div class="flex space-x-6">
                <div class="flex items-center">
                  <input
                    id="gender-male"
                    v-model="signupForm.gender"
                    type="radio"
                    value="male"
                    class="h-4 w-4 text-theme focus:ring-theme border-gray-300 transition-colors"
                  />
                  <label for="gender-male" class="ml-2 text-sm text-gray-700">남성</label>
                </div>
                <div class="flex items-center">
                  <input
                    id="gender-female"
                    v-model="signupForm.gender"
                    type="radio"
                    value="female"
                    class="h-4 w-4 text-theme focus:ring-theme border-gray-300 transition-colors"
                  />
                  <label for="gender-female" class="ml-2 text-sm text-gray-700">여성</label>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-start">
                <input
                  id="agreeAll"
                  v-model="agreeAll"
                  type="checkbox"
                  class="mt-1 h-4 w-4 text-theme focus:ring-theme border-gray-300 rounded transition-colors"
                  @change="toggleAllAgreements"
                />
                <label for="agreeAll" class="ml-3 text-sm font-medium text-gray-900">
                  전체 동의
                </label>
              </div>

              <div class="ml-7 space-y-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-start">
                    <input
                      id="agreeTerms"
                      v-model="agreements.terms"
                      type="checkbox"
                      class="mt-1 h-4 w-4 text-theme focus:ring-theme border-gray-300 rounded transition-colors"
                      @change="updateAgreeAll"
                    />
                    <label for="agreeTerms" class="ml-3 text-sm text-gray-700">
                      <span class="text-red-500">*</span> 이용약관 동의
                    </label>
                  </div>
                  <button
                    type="button"
                    class="text-xs text-theme hover:text-theme-dark transition-colors font-medium"
                  >
                    보기
                  </button>
                </div>

                <div class="flex items-start justify-between">
                  <div class="flex items-start">
                    <input
                      id="agreePrivacy"
                      v-model="agreements.privacy"
                      type="checkbox"
                      class="mt-1 h-4 w-4 text-theme focus:ring-theme border-gray-300 rounded transition-colors"
                      @change="updateAgreeAll"
                    />
                    <label for="agreePrivacy" class="ml-3 text-sm text-gray-700">
                      <span class="text-red-500">*</span> 개인정보 처리방침 동의
                    </label>
                  </div>
                  <button
                    type="button"
                    class="text-xs text-theme hover:text-theme-dark transition-colors font-medium"
                  >
                    보기
                  </button>
                </div>

                <div class="flex items-start justify-between">
                  <div class="flex items-start">
                    <input
                      id="agreeMarketing"
                      v-model="agreements.marketing"
                      type="checkbox"
                      class="mt-1 h-4 w-4 text-theme focus:ring-theme border-gray-300 rounded transition-colors"
                      @change="updateAgreeAll"
                    />
                    <label for="agreeMarketing" class="ml-3 text-sm text-gray-700">
                      마케팅 정보 수신 동의 (선택)
                    </label>
                  </div>
                  <button
                    type="button"
                    class="text-xs text-theme hover:text-theme-dark transition-colors font-medium"
                  >
                    보기
                  </button>
                </div>
              </div>

              <p v-if="errors.agreements" class="text-sm text-red-600">
                {{ errors.agreements }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
            >
              <span v-if="!isLoading" class="text-gray-800">회원가입</span>
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
                회원가입 중...
              </span>
            </button>

            <div v-if="signupError" class="bg-red-50 border border-red-200 rounded-lg p-4">
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
                <p class="text-sm text-red-600">{{ signupError }}</p>
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
              이미 계정이 있으신가요?
              <a
                href="/login"
                class="text-theme hover:text-theme-dark font-medium transition-colors"
                >로그인</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 회원가입 폼 인터페이스
interface SignupForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  gender: string
}

interface Agreements {
  terms: boolean
  privacy: boolean
  marketing: boolean
}

// 반응형 데이터
const signupForm = ref<SignupForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  gender: '',
})

const agreements = ref<Agreements>({
  terms: false,
  privacy: false,
  marketing: false,
})

const agreeAll = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const signupError = ref('')
const emailChecking = ref(false)
const emailAvailable = ref(false)

// 유효성 검사 에러
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreements: '',
})

// 비밀번호 강도 계산
const passwordStrength = computed(() => {
  const password = signupForm.value.password
  if (!password) return 0

  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  return Math.min(score, 4)
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return ''
  if (strength === 1) return '매우 약함'
  if (strength === 2) return '약함'
  if (strength === 3) return '보통'
  return '강함'
})

const passwordStrengthTextColor = computed(() => {
  const strength = passwordStrength.value
  if (strength <= 1) return 'text-red-500'
  if (strength === 2) return 'text-orange-500'
  if (strength === 3) return 'text-yellow-500'
  return 'text-green-500'
})

// 비밀번호 강도 바 색상
const getPasswordStrengthColor = (index: number) => {
  const strength = passwordStrength.value
  if (index <= strength) {
    if (strength <= 1) return 'bg-red-500'
    if (strength === 2) return 'bg-orange-500'
    if (strength === 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }
  return 'bg-gray-200'
}

// 비밀번호 표시/숨기기
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// 전체 동의 토글
const toggleAllAgreements = () => {
  const value = agreeAll.value
  agreements.value.terms = value
  agreements.value.privacy = value
  agreements.value.marketing = value
}

// 전체 동의 상태 업데이트
const updateAgreeAll = () => {
  agreeAll.value = agreements.value.terms && agreements.value.privacy && agreements.value.marketing
}

// 이메일 중복 확인
const checkEmailDuplicate = async () => {
  if (!signupForm.value.email || errors.value.email) return

  emailChecking.value = true
  emailAvailable.value = false

  try {
    // 실제 API 호출 예시
    // const { available } = await $fetch('/api/auth/check-email', {
    //   method: 'POST',
    //   body: { email: signupForm.value.email }
    // })

    // 임시 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))
    emailAvailable.value = true
  } catch (error) {
    errors.value.email = '이미 사용 중인 이메일입니다.'
  } finally {
    emailChecking.value = false
  }
}

// 유효성 검사
const validateForm = () => {
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreements: '',
  }

  let isValid = true

  // 이름 검사
  if (!signupForm.value.name.trim()) {
    errors.value.name = '이름을 입력해주세요.'
    isValid = false
  } else if (signupForm.value.name.length < 2) {
    errors.value.name = '이름은 최소 2자 이상이어야 합니다.'
    isValid = false
  }

  // 이메일 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!signupForm.value.email) {
    errors.value.email = '이메일을 입력해주세요.'
    isValid = false
  } else if (!emailRegex.test(signupForm.value.email)) {
    errors.value.email = '올바른 이메일 형식을 입력해주세요.'
    isValid = false
  }

  // 비밀번호 검사
  if (!signupForm.value.password) {
    errors.value.password = '비밀번호를 입력해주세요.'
    isValid = false
  } else if (signupForm.value.password.length < 8) {
    errors.value.password = '비밀번호는 최소 8자 이상이어야 합니다.'
    isValid = false
  } else if (passwordStrength.value < 2) {
    errors.value.password = '더 강한 비밀번호를 사용해주세요.'
    isValid = false
  }

  // 비밀번호 확인 검사
  if (!signupForm.value.confirmPassword) {
    errors.value.confirmPassword = '비밀번호 확인을 입력해주세요.'
    isValid = false
  } else if (signupForm.value.password !== signupForm.value.confirmPassword) {
    errors.value.confirmPassword = '비밀번호가 일치하지 않습니다.'
    isValid = false
  }
}
</script>
