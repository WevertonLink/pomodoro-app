class SoundManager {
  private volume = 0.7
  private enabled = true
  private isPlaying = false

  async init() {
    console.log('SoundManager initialized')
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  play(soundId: 'work-start' | 'work-end' | 'break-start' | 'break-end') {
    if (!this.enabled || this.isPlaying) return

    this.isPlaying = true

    try {
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      const frequencies = {
        'work-start': 800,
        'work-end': 600,
        'break-start': 500,
        'break-end': 700,
      }

      oscillator.frequency.value = frequencies[soundId]
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(this.volume * 0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)

      setTimeout(() => {
        this.isPlaying = false
        audioContext.close()
      }, 600)
    } catch (error) {
      console.error('Error playing sound:', error)
      this.isPlaying = false
    }
  }

  async requestNotificationPermission() {
    // Em PWA, não pedimos permissão de notificação tradicional
    console.log('Notification permission (PWA mode)')
  }

  showNotification(title: string, body: string) {
    // Em PWA, apenas logamos (ou podemos usar Service Worker notification)
    console.log('📢 Notification:', title, body)
    
    // Alternativa: mostrar toast visual no app ao invés de notificação do sistema
    // Isso seria implementado com um componente React
  }
}

export const soundManager = new SoundManager()
