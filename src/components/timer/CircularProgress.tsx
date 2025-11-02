interface CircularProgressProps {
  progress: number // 0 a 100
  size?: number
  strokeWidth?: number
  color?: string
}

export function CircularProgress({ 
  progress, 
  size = 280, 
  strokeWidth = 8,
  color = 'currentColor'
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg 
      width={size} 
      height={size} 
      className="transform -rotate-90"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-muted opacity-20"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300 ease-out"
        style={{ 
          stroke: color,
          filter: 'drop-shadow(0 0 8px currentColor)'
        }}
      />
    </svg>
  )
}
