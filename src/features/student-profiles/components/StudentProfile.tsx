import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface StudentProfileProps {
  student: Student
  onClose: () => void
}

export function StudentProfile({ student, onClose }: StudentProfileProps) {
  return (
    <GlassCard className="h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-muted-foreground">{student.class}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-accent">
          <X size={20} />
        </button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="skills">Beceriler</TabsTrigger>
          <TabsTrigger value="progress">İlerleme</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Genel İlerleme</h3>
              <Progress value={student.progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">Toplam ilerleme: {student.progress}%</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Son Değerlendirme</h3>
              <p className="text-muted-foreground">{student.lastAssessment}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Özel Notlar</h3>
              <p className="text-muted-foreground">{student.notes || 'Henüz not eklenmemiş'}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Beceri Seviyeleri</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map(skill => (
                <Badge key={skill.name} variant={skill.level === 'advanced' ? 'default' : skill.level === 'intermediate' ? 'secondary' : 'outline'}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">İlerleme Grafiği</h3>
            <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">İlerleme grafiği burada görüntülenecek</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </GlassCard>
  )
}