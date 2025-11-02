import { useAtom } from 'jotai'
import { settingsAtom } from '../store/settings-store'

export function useSettings() {
  const [settings, setSettings] = useAtom(settingsAtom)

  const updateSettings = (partial: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }))
  }

  return {
    settings,
    updateSettings,
  }
}
