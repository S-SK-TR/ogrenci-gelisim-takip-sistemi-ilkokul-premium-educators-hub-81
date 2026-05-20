import { GlassCard } from '@/components/ui/GlassCard'
import { BentoGrid } from '@/components/ui/BentoGrid'
import { BarChart, PieChart, HelpCircle } from 'lucide-react'

interface ReportCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ReportCard({ title, description, icon }: ReportCardProps) {
  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground flex-1">{description}</p>
      <button className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
        Raporu Görüntüle
      </button>
    </GlassCard>
  )
}

export function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display">Raporlar</h1>

      <BentoGrid>
        <ReportCard
          title="Sınıf Performansı"
          description="Tüm sınıfların genel performansını analiz edin"
          icon={<BarChart size={20} />}
        />

        <ReportCard
          title="Beceri Dağılımı"
          description="Öğrencilerin beceri seviyelerini grafiksel olarak inceleyin"
          icon={<PieChart size={20} />}
        />

        <ReportCard
          title="Zaman İçinde İlerleme"
          description="Öğrencilerin zaman içinde gelişimlerini takip edin"
          icon={<HelpCircle size={20} />}
        />

        <GlassCard className="md:col-span-2">
          <h2 className="text-xl font-medium mb-4">Rapor Oluştur</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select className="glass-card p-3 rounded-lg bg-transparent border border-border">
                <option value="">Sınıf Seçin</option>
                <option value="3/A">3/A Sınıfı</option>
                <option value="3/B">3/B Sınıfı</option>
              </select>
              <select className="glass-card p-3 rounded-lg bg-transparent border border-border">
                <option value="">Rapor Türü</option>
                <option value="performance">Performans Raporu</option>
                <option value="skills">Beceri Raporu</option>
                <option value="progress">İlerleme Raporu</option>
              </select>
            </div>
            <div className="flex gap-4">
              <input type="date" className="glass-card p-3 rounded-lg bg-transparent border border-border flex-1" />
              <input type="date" className="glass-card p-3 rounded-lg bg-transparent border border-border flex-1" />
            </div>
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Raporu Oluştur
            </button>
          </div>
        </GlassCard>
      </BentoGrid>
    </div>
  )
}