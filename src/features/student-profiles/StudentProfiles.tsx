import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { BentoGrid } from '@/components/ui/BentoGrid'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from '@/core/hooks/useStore'
import { StudentProfile } from './components/StudentProfile'

interface StudentCardProps {
  student: Student
  onClick: () => void
}

function StudentCard({ student, onClick }: StudentCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <GlassCard className="cursor-pointer hover:scale-[1.02] transition-transform">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.class}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>İlerleme</span>
            <span>{student.progress}%</span>
          </div>
          <Progress value={student.progress} className="h-2" />
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function StudentProfiles() {
  const students = useStore(state => state.students)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display">Öğrenci Profilleri</h1>

      <div className="flex gap-6">
        <div className="flex-1">
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Öğrenci Listesi</h2>
              <button className="text-sm text-primary hover:underline">Tümü</button>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {students.map(student => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onClick={() => setSelectedStudent(student)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedStudent ? (
              <motion.div
                key={selectedStudent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <StudentProfile student={selectedStudent} onClose={() => setSelectedStudent(null)} />
              </motion.div>
            ) : (
              <GlassCard className="h-full flex flex-col items-center justify-center">
                <Users size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Bir öğrenci seçin</p>
              </GlassCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}