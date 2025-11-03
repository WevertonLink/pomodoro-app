import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Smartphone, Wifi, Download } from 'lucide-react'

export function AboutSection() {
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches
  const isOnline = navigator.onLine

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre o App</CardTitle>
        <CardDescription>
          Informações e status do aplicativo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Status PWA</span>
          </div>
          <Badge variant={isInstalled ? 'default' : 'secondary'}>
            {isInstalled ? '✓ Instalado' : 'Web'}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Conexão</span>
          </div>
          <Badge variant={isOnline ? 'default' : 'secondary'}>
            {isOnline ? '✓ Online' : 'Offline'}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Versão</span>
          </div>
          <Badge variant="outline">
            v1.0.0
          </Badge>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Dica:</strong> Instale o app na tela inicial para acesso rápido e funcionamento offline.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            ❤️ Feito com React, TypeScript, Tailwind CSS e shadcn/ui
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
