class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private volume = 0.7
  private enabled = true

  async init() {
    // Por enquanto, vamos usar sons padrão do navegador
    // Mais tarde você pode adicionar arquivos MP3 personalizados
    console.log('SoundManager initialized')
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  play(soundId: 'work-start' | 'work-end' | 'break-start' | 'break-end') {
    if (!this.enabled) return

    // Usar Web Audio API para criar beeps simples
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Diferentes frequências para diferentes sons
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
  }

  // Notificação do navegador
  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  showNotification(title: string, body: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      })
    }
  }
}

export const soundManager = new SoundManager()
