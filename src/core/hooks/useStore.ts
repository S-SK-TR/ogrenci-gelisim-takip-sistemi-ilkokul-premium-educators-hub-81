import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

interface Student {
  id: string
  name: string
  class: string
  avatar: string
  progress: number
  lastAssessment: string
  notes?: string
  skills: Skill[]
}

interface StoreState {
  students: Student[]
  ui: {
    isLoading: boolean
    error: string | null
  }
}

interface StoreActions {
  setStudents: (students: Student[]) => void
  addStudent: (student: Student) => void
  updateStudent: (id: string, updates: Partial<Student>) => void
  setUi: (ui: Partial<StoreState['ui']>) => void
  resetStore: () => void
}

type Store = StoreState & StoreActions

const initialState: StoreState = {
  students: [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      class: '3/A Sınıfı',
      avatar: '/avatars/ahmet.jpg',
      progress: 75,
      lastAssessment: '2024-05-10: Matematik ve Türkçe alanında iyi ilerleme gösterdi.',
      skills: [
        { name: 'Matematik', level: 'advanced' },
        { name: 'Türkçe', level: 'intermediate' },
        { name: 'Sosyal Bilgiler', level: 'beginner' }
      ]
    },
    {
      id: '2',
      name: 'Ayşe Kaya',
      class: '3/B Sınıfı',
      avatar: '/avatars/ayse.jpg',
      progress: 60,
      lastAssessment: '2024-05-08: Fen bilimlerinde güçlü performans gösterdi.',
      skills: [
        { name: 'Fen Bilimleri', level: 'advanced' },
        { name: 'İngilizce', level: 'intermediate' }
      ]
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      class: '3/A Sınıfı',
      avatar: '/avatars/mehmet.jpg',
      progress: 85,
      lastAssessment: '2024-05-05: Tüm alanlarda üst düzey performans.',
      skills: [
        { name: 'Matematik', level: 'advanced' },
        { name: 'Türkçe', level: 'advanced' },
        { name: 'Fen Bilimleri', level: 'intermediate' }
      ]
    }
  ],
  ui: {
    isLoading: false,
    error: null
  }
}

export const useStore = create<Store>()(
  devtools(
    immer((set) => ({
      ...initialState,
      setStudents: (students) => set({ students }),
      addStudent: (student) => set(state => {
        state.students.push(student)
      }),
      updateStudent: (id, updates) => set(state => {
        const index = state.students.findIndex(s => s.id === id)
        if (index !== -1) {
          state.students[index] = { ...state.students[index], ...updates }
        }
      }),
      setUi: (ui) => set(state => {
        state.ui = { ...state.ui, ...ui }
      }),
      resetStore: () => set(initialState)
    }))
  )
)