/**
 * [INPUT]: 依赖 @/components/ui/* 的全部设计系统组件
 * [OUTPUT]: 导出 DesignSystem 页面组件，路由 "/design-system"
 * [POS]: pages 层设计系统展示页，所有 shadcn/ui 组件的可视化验收场，被 App.jsx 的 Route 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Loader2, ArrowRight, Star } from 'lucide-react'

function Section({ title, description, children }) {
  return (
    <section className="mb-14">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <Separator className="mb-6" />
      {children}
    </section>
  )
}

export default function DesignSystem() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* 标题 */}
      <div className="mb-14">
        <Badge className="mb-4">Design System</Badge>
        <h1 className="text-4xl font-bold text-foreground tracking-tighter mb-3">
          Nature · 微拟物光影质感
        </h1>
        <p className="text-muted-foreground text-lg">
          三段渐变 + 三层阴影 + 微交互。所有颜色来自设计系统 token，所有组件来自 shadcn/ui。
        </p>
      </div>

      {/* ── 微拟物组件展示 ── */}
      <Section
        title="微拟物按钮"
        description="三段渐变背景 + 外投影 + 顶部高光 + 底部暗边，hover 上浮，active 下压"
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XLarge</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button isLoading>Loading</Button>
            <Button leftIcon={<Star />}>左图标</Button>
            <Button rightIcon={<ArrowRight />}>右图标</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      <Section
        title="微拟物卡片"
        description="default 平面 · raised 凸起（外投影+高光）· inset 内凹 · gradient 品牌渐变"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-base">Default 平面</CardTitle>
              <CardDescription>基础投影，轻量层次</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">胜率 78%，连胜 12 场</p>
            </CardContent>
          </Card>

          <Card variant="raised">
            <CardHeader>
              <CardTitle className="text-base">Raised 凸起</CardTitle>
              <CardDescription>外投影 + 顶部高光，悬浮感</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">冠军 × 4，亚军 × 2</p>
            </CardContent>
          </Card>

          <Card variant="inset">
            <CardHeader>
              <CardTitle className="text-base">Inset 内凹</CardTitle>
              <CardDescription>内嵌阴影，容器质感</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">数据统计区域</p>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardHeader>
              <CardTitle className="text-base">Gradient 品牌</CardTitle>
              <CardDescription className="text-primary-foreground/70">品牌渐变，强调突出</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-foreground/80">高亮展示区域</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="微拟物输入框"
        description="inset 阴影模拟按压内凹，focus 时高光边框"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-2">
            <Label>球员姓名</Label>
            <Input placeholder="输入姓名..." />
          </div>
          <div className="space-y-2">
            <Label>搜索赛事</Label>
            <Input placeholder="温布尔登..." />
          </div>
        </div>
      </Section>

      <Section
        title="微拟物徽章"
        description="渐变背景 + 顶部高光，圆角 16px"
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section
        title="微拟物开关"
        description="checked 时 track 品牌渐变，thumb 球形高光"
      >
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Switch defaultChecked />
            <Label>已开启</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch />
            <Label>已关闭</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled defaultChecked />
            <Label className="text-muted-foreground">禁用</Label>
          </div>
        </div>
      </Section>

      {/* ── 基础组件 ── */}
      <Section title="颜色系统">
        <div className="flex flex-wrap gap-3">
          {[
            ['bg-primary', 'primary'],
            ['bg-secondary', 'secondary'],
            ['bg-accent', 'accent'],
            ['bg-muted', 'muted'],
            ['bg-destructive', 'destructive'],
            ['bg-border', 'border'],
            ['bg-card', 'card'],
            ['bg-background', 'background'],
          ].map(([cls, label]) => (
            <div key={cls} className="flex flex-col items-center gap-1">
              <div className={`w-14 h-14 rounded-[16px] ${cls} border border-border shadow-sm`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="反馈组件">
        <div className="space-y-4 max-w-lg">
          <Alert>
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>比赛将在 30 分钟后开始。</AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label>加载进度 65%</Label>
            <Progress value={65} />
          </div>
          <Skeleton className="h-12 w-full rounded-[16px]" />
        </div>
      </Section>

      <Section title="头像">
        <div className="flex gap-4">
          {['RF', 'ND', 'SW', 'AZ'].map((name) => (
            <Avatar key={name} className="w-14 h-14">
              <AvatarFallback className="text-base font-semibold">{name}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </Section>

      <Section title="标签页">
        <Tabs defaultValue="atp">
          <TabsList>
            <TabsTrigger value="atp">ATP</TabsTrigger>
            <TabsTrigger value="wta">WTA</TabsTrigger>
            <TabsTrigger value="grand-slam">大满贯</TabsTrigger>
          </TabsList>
          <TabsContent value="atp" className="pt-4">
            <p className="text-sm text-muted-foreground">ATP 男子职业网球协会赛事列表。</p>
          </TabsContent>
          <TabsContent value="wta" className="pt-4">
            <p className="text-sm text-muted-foreground">WTA 女子职业网球协会赛事列表。</p>
          </TabsContent>
          <TabsContent value="grand-slam" className="pt-4">
            <p className="text-sm text-muted-foreground">四大满贯：澳网、法网、温网、美网。</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="表单组件">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
          <div className="space-y-2">
            <Label>多行文本</Label>
            <Textarea placeholder="输入简介..." rows={3} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree">同意条款</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="news" defaultChecked />
              <Label htmlFor="news">订阅资讯</Label>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
