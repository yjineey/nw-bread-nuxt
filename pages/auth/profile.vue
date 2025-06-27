<template>
  <div class="min-h-screen border-outline">
    <div class="min-h-screen p-4 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8 pt-8">
          <h1 class="text-3xl font-bold mb-2">프로필 설정</h1>
          <p>개인정보 및 계정 설정을 관리하세요</p>
        </div>

        <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-gray-400 text-gray-900'
                    : 'border-transparent text-gray-500',
                ]"
              >
                <div class="flex items-center space-x-2">
                  <component :is="tab.icon" class="w-5 h-5" />
                  <span>{{ tab.name }}</span>
                </div>
              </button>
            </nav>
          </div>

          <div class="p-6">
            <!-- 개인정보 탭 -->
            <div v-if="activeTab === 'profile'" class="space-y-8">
              <div class="flex items-center space-x-6 mb-8">
                <div class="relative">
                  <div
                    class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden"
                  >
                    <img
                      v-if="profileForm.avatar"
                      :src="profileForm.avatar"
                      alt="프로필 이미지"
                      class="w-full h-full object-cover"
                    />
                    <svg
                      v-else
                      class="w-12 h-12 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    @click="triggerFileUpload"
                    :class="[
                      'absolute bottom-0 right-0 bg-theme  rounded-full p-2 shadow-lg hover:bg-theme-dark transition-colors',
                      mode === 'light' && colorScheme === 'none'
                        ? 'btn-fileupload text-black'
                        : text - white,
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </button>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                  />
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">프로필 사진</h3>
                  <p class="text-sm text-gray-500">JPG, PNG 파일을 업로드하세요 (최대 5MB)</p>
                </div>
              </div>

              <form @submit.prevent="updateProfile" class="space-y-8">
                <div class="border-b border-gray-200 pb-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
                  <div class="space-y-4">
                    <div class="w-full">
                      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                        이름 <span class="text-red-500"> *</span>
                      </label>
                      <input
                        id="name"
                        v-model="profileForm.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                        :class="{ 'border-red-500': errors.name }"
                        placeholder="이름을 입력하세요"
                      />
                      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                    </div>

                    <div class="w-full">
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                        전화번호
                      </label>
                      <input
                        id="phone"
                        v-model="profileForm.phone"
                        type="tel"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                        :class="{ 'border-red-500': errors.phone }"
                        placeholder="010-1234-5678"
                      />
                      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                        {{ errors.phone }}
                      </p>
                    </div>

                    <div class="w-full">
                      <label for="birthday" class="block text-sm font-medium text-gray-700 mb-2">
                        생년월일
                      </label>
                      <input
                        id="birthday"
                        v-model="profileForm.birthday"
                        type="date"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors"
                      />
                    </div>

                    <div class="w-full">
                      <label class="block text-sm font-medium text-gray-700 mb-3">성별</label>
                      <div class="flex space-x-6">
                        <label class="flex items-center">
                          <input v-model="profileForm.gender" type="radio" value="male" />
                          <span class="ml-2 text-sm text-gray-700">남성</span>
                        </label>
                        <label class="flex items-center">
                          <input v-model="profileForm.gender" type="radio" value="female" />
                          <span class="ml-2 text-sm text-gray-700">여성</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-b border-gray-200 pb-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">계정 정보</h3>
                  <div class="space-y-4">
                    <div class="w-full">
                      <label for="userId" class="block text-sm font-medium text-gray-700 mb-2">
                        아이디
                      </label>
                      <input
                        id="userId"
                        v-model="profileForm.userId"
                        type="text"
                        readonly
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div class="w-full">
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        이메일
                      </label>
                      <input
                        id="email"
                        v-model="profileForm.email"
                        type="email"
                        readonly
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex justify-end space-x-4">
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
                    style="cursor: pointer"
                  >
                    취소
                  </button>
                  <button type="submit" @click="saveForm('profile')" class="btn-primary">
                    <span>저장하기</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- 보안설정 탭 -->
            <div v-if="activeTab === 'security'" class="space-y-8">
              <div class="border-b border-gray-200 pb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">기본 보안 설정</h3>
                <div class="space-y-4">
                  <div class="w-full">
                    <label
                      for="currentPassword"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      현재 비밀번호<span class="text-red-500"> *</span>
                    </label>
                    <div class="relative">
                      <input
                        id="currentPassword"
                        v-model="signupForm.currentPassword"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme focus:border-theme transition-colors pr-12"
                        placeholder="비밀번호를 입력하세요"
                        :class="{ 'border-red-500': errors.currentPassword }"
                      />
                      <button
                        type="button"
                        @click="toggleCurrentPassword"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <svg
                          v-if="!showCurrentPassword"
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
                        <svg
                          v-else
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <p v-if="errors.currentPassword" class="mt-1 text-sm text-red-600">
                      {{ errors.currentPassword }}
                    </p>
                  </div>

                  <div class="w-full">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                      새 비밀번호<span class="text-red-500"> *</span>
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
                        <svg
                          v-else
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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

                  <div class="w-full">
                    <label
                      for="confirmPassword"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      새 비밀번호 확인 <span class="text-red-500"> *</span>
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
                        <svg
                          v-else
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
                  style="cursor: pointer"
                >
                  취소
                </button>
                <button type="submit" @click="saveForm('security')" class="btn-primary">
                  <span>저장하기</span>
                </button>
              </div>
            </div>

            <!-- 테마설정 탭 -->
            <div v-if="activeTab === 'theme'" class="space-y-8">
              <div class="border-b border-gray-200 pb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">테마설정</h3>
                <div class="space-y-4">
                  <div class="w-full">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                      테마 배경
                    </label>
                    <div class="relative">
                      <button @click="toggleDark">
                        {{ mode === 'dark' ? '🌙' : '☀️' }}
                      </button>
                    </div>
                  </div>

                  <div class="w-full">
                    <label
                      for="currentPassword"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      스키마 색상
                    </label>
                    <div class="relative">
                      <div class="flex gap-2">
                        <button
                          v-for="(scheme, key) in colorSchemes"
                          :key="key"
                          @click="setColorScheme(key)"
                          :class="[
                            'w-6 h-6 rounded-full border-2 transition-all',
                            colorScheme === key ? 'scale-110 border-gray-400' : 'border-gray-200',
                          ]"
                          :style="{ backgroundColor: scheme.color }"
                          :title="scheme.name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
                  style="cursor: pointer"
                >
                  취소
                </button>
                <button type="submit" @click="saveForm('theme')" class="btn-primary">
                  <span>저장하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { mode, colorScheme, toggleDark, setColorScheme, colorSchemes } = useTheme()

// 아이콘 컴포넌트들
const UserIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`,
}

const PaletteIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path></svg>`,
}

const CogIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
}

// 인터페이스 정의
interface ProfileForm {
  userId: string
  name: string
  email: string
  phone: string
  gender: string
  birthday: string
}

interface ThemeSettings {
  primaryColor: string
  darkMode: string
  customPrimary: string
  customSecondary: string
}

interface PasswordForm {
  password: string
  currentPassword: string
  confirmPassword: string
}

interface SignupForm {
  name: string
  email: string
  password: string
  currentPassword: string
  confirmPassword: string
  phone: string
  gender: string
}

const signupForm = ref<SignupForm>({
  name: '',
  email: '',
  password: '',
  currentPassword: '',
  confirmPassword: '',
  phone: '',
  gender: '',
})

// 반응형 데이터
const activeTab = ref('profile')
const isLoading = ref(false)
const fileInput = ref<HTMLInputElement>()
const showPassword = ref(false)
const showCurrentPassword = ref(false)
const showConfirmPassword = ref(false)

// 탭 목록
const tabs = [
  { id: 'profile', name: '개인정보', icon: UserIcon },
  { id: 'security', name: '보안설정', icon: PaletteIcon },
  { id: 'theme', name: '테마설정', icon: CogIcon },
]

// 프로필 폼
const profileForm = ref<ProfileForm>({
  userId: 'newway',
  name: '뉴웨이',
  email: 'newway@example.com',
  phone: '010-1234-5678',
  gender: 'male',
  birthday: '1990-01-01',
})

onMounted(() => {
  // 쿠키 기준으로 테마 설정, 모바일 환경에서 시스템 모드에 따라 테마 적용되는 오류 방지
  if (themeMode.value === 'light' && mode.value === 'dark') {
    toggleDark()
  } else if (themeMode.value === 'dark' && mode.value === 'light') {
    toggleDark()
  }
})
// 비밀번호 폼
const passwordForm = ref<PasswordForm>({
  password: '',
  currentPassword: '',
  confirmPassword: '',
})
// 초기 프로필 데이터 백업
const initialProfileForm = ref<ProfileForm>({ ...profileForm.value })

// 에러 상태
const errors = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  currentPassword: '',
  confirmPassword: '',
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

const toggleCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// 파일 업로드 트리거
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 이미지 업로드 처리
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    // 파일 형식 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }
  }
}

// 프로필 유효성 검사
const validateProfile = () => {
  errors.value = {
    name: '',
    email: '',
    phone: '',
    password: '',
    currentPassword: '',
    confirmPassword: '',
  }
  let isValid = true

  // 이름 검사
  if (!profileForm.value.name.trim()) {
    errors.value.name = '이름을 입력해주세요.'
    isValid = false
  } else if (profileForm.value.name.length < 2) {
    errors.value.name = '이름은 최소 2자 이상이어야 합니다.'
    isValid = false
  }

  // 전화번호 검사 (선택사항이지만 입력했다면 유효성 검사)
  if (profileForm.value.phone) {
    const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/
    if (!phoneRegex.test(profileForm.value.phone.replace(/-/g, ''))) {
      errors.value.phone = '올바른 전화번호 형식을 입력해주세요.'
      isValid = false
    }
  }

  // 비밀번호 변경 검사 (비밀번호 필드 중 하나라도 입력되었을 때)
  const hasPasswordInput =
    passwordForm.value.password ||
    passwordForm.value.currentPassword ||
    passwordForm.value.confirmPassword

  if (hasPasswordInput) {
    if (!passwordForm.value.password) {
      errors.value.password = '현재 비밀번호를 입력해주세요.'
      isValid = false
    }

    if (!passwordForm.value.currentPassword) {
      errors.value.currentPassword = '새 비밀번호를 입력해주세요.'
      isValid = false
    } else if (passwordForm.value.currentPassword.length < 8) {
      errors.value.currentPassword = '비밀번호는 최소 8자 이상이어야 합니다.'
      isValid = false
    }

    if (!passwordForm.value.confirmPassword) {
      errors.value.confirmPassword = '새 비밀번호 확인을 입력해주세요.'
      isValid = false
    } else if (passwordForm.value.currentPassword !== passwordForm.value.confirmPassword) {
      errors.value.confirmPassword = '새 비밀번호가 일치하지 않습니다.'
      isValid = false
    }
  }

  return isValid
}

// 폼 초기화
const resetForm = () => {
  profileForm.value = { ...initialProfileForm.value }
  passwordForm.value = {
    password: '',
    currentPassword: '',
    confirmPassword: '',
  }
  errors.value = {
    name: '',
    email: '',
    phone: '',
    password: '',
    currentPassword: '',
    confirmPassword: '',
  }
}
const saveForm = (param: string) => {
  if (param === 'profile') {
    // updateProfile()
  } else if (param === 'security') {
    // updateProfile()
  } else if (param === 'theme') {
    // alert('테마 설정이 저장되었습니다.')
  }
}

// 프로필 업데이트
const updateProfile = async () => {
  if (!validateProfile()) return

  isLoading.value = true

  try {
    // 실제 API 호출 예시
    // const profileData = {
    //   name: profileForm.value.name,
    //   phone: profileForm.value.phone,
    //   gender: profileForm.value.gender,
    //   birthday: profileForm.value.birthday,
    // }

    // const passwordData = passwordForm.value.password ? {
    //   password: passwordForm.value.password,
    //   currentPassword: passwordForm.value.currentPassword,
    // } : null

    // // 프로필 업데이트
    // await $fetch('/api/profile/update', {
    //   method: 'PUT',
    //   body: profileData
    // })

    // // 비밀번호 변경 (필요한 경우)
    // if (passwordData) {
    //   await $fetch('/api/profile/change-password', {
    //     method: 'PUT',
    //     body: passwordData
    //   })
    // }

    // 임시 저장 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 초기 데이터 업데이트
    initialProfileForm.value = { ...profileForm.value }

    // 비밀번호 폼 초기화
    passwordForm.value = {
      password: '',
      currentPassword: '',
      confirmPassword: '',
    }

    // 성공 메시지
    alert('프로필이 성공적으로 저장되었습니다.')
  } catch (error: any) {
    console.error('프로필 업데이트 오류:', error)
    alert('프로필 저장에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
