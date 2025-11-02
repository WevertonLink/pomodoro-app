interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}

export function CircularProgress({ 
  progress, 
  size = 320, 
  strokeWidth = 12,
  color = '#ef4444'
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
      {/* Background circle (track) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-muted opacity-10"
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
        className="transition-all duration-500 ease-out"
        style={{ 
          filter: 'drop-shadow(0 0 12px currentColor)',
          opacity: 0.9
        }}
      />
      
      {/* Glow effect */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth / 2}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
        style={{ 
          filter: 'blur(8px)',
          opacity: 0.4
        }}
      />
    </svg>
  )
}
