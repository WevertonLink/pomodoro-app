interface HeatMapProps {
  data: {
    date: string
    value: number
  }[]
}

export function HeatMap({ data }: HeatMapProps) {
  const getColor = (value: number) => {
    if (value === 0) return 'bg-muted'
    if (value <= 2) return 'bg-green-200 dark:bg-green-900'
    if (value <= 4) return 'bg-green-300 dark:bg-green-800'
    if (value <= 6) return 'bg-green-400 dark:bg-green-700'
    return 'bg-green-500 dark:bg-green-600'
  }

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getDate()}/${date.getMonth() + 1}`
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="aspect-square rounded-md flex flex-col items-center justify-center p-1"
          title={`${getDateLabel(item.date)}: ${item.value} pomodoros`}
        >
          <div className={`w-full h-full rounded ${getColor(item.value)}`} />
          <span className="text-xs text-muted-foreground mt-1">
            {new Date(item.date).getDate()}
          </span>
        </div>
      ))}
    </div>
  )
}
