import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { BentoGrid } from '@/components/ui/BentoGrid'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStore } from '@/core/hooks/useStore'

interface DashboardCardProps {
  title: string
  value: string | number
  progress?: number
  icon: React.ReactNode
}

function DashboardCard({ title, value, progress, icon }: DashboardCardProps) {
  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-3xl font-bold mb-2">{value}</p>
        {progress !== undefined && (
          <Progress value={progress} className="h-2" />
        )}
      </div>
    </GlassCard>
  )
}

export function Dashboard() {
  const students = useStore(state => state.students)
  const recentStudents = students.slice(0, 3)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display">Dashboard</h1>

      <BentoGrid>
        <GlassCard className="md:col-span-2">
          <h2 className="text-xl font-medium mb-4">Son Öğrenciler</h2>
          <div className="space-y-4">
            {recentStudents.map(student => (
              <div key={student.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.class}</p>
                </div>
                <div className="ml-auto">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.progress >= 80 ? 'bg-green-500/10 text-green-500' :
                    student.progress >= 50 ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {student.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <DashboardCard
          title="Toplam Öğrenci"
          value={students.length}
          icon={<Users size={20} />}
        />

        <DashboardCard
          title="Ortalama İlerleme"
          value={`${Math.round(students.reduce((acc, student) => acc + student.progress, 0) / students.length)}%`}
          progress={Math.round(students.reduce((acc, student) => acc + student.progress, 0) / students.length)}
          icon={<BarChart2 size={20} />}
        />

        <GlassCard className="md:col-span-2">
          <h2 className="text-xl font-medium mb-4">Hızlı Eylemler</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="glass-card flex flex-col items-center justify-center p-4 h-24">
              <PlusCircle size={24} className="mb-2" />
              <span>Yeni Öğrenci</span>
            </button>
            <button className="glass-card flex flex-col items-center justify-center p-4 h-24">
              <FileText size={24} className="mb-2" />
              <span>Rapor Oluştur</span>
            </button>
          </div>
        </GlassCard>
      </BentoGrid>
    </div>
  )
}