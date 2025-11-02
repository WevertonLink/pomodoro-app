import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Plus } from 'lucide-react'

interface AddTaskDialogProps {
  onAddTask: (task: {
    title: string
    description?: string
    category?: string
    estimatedPomodoros: number
  }) => void
  categories: { id: string; name: string; icon: string }[]
}

export function AddTaskDialog({ onAddTask, categories }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('work')
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(4)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      estimatedPomodoros,
    })

    setTitle('')
    setDescription('')
    setCategory('work')
    setEstimatedPomodoros(4)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Estudar React"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes opcionais..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pomodoros">Pomodoros Estimados</Label>
            <Input
              id="pomodoros"
              type="number"
              min={1}
              max={20}
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Adicionar
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
