interface SimpleBarChartProps {
  data: {
    label: string
    value: number
  }[]
  maxValue?: number
  color?: string
}

export function SimpleBarChart({ data, maxValue, color = '#ef4444' }: SimpleBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1)

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
