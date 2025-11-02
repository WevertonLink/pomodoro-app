# Common AI Mistakes - DO NOT REPEAT

## 1. State Management
❌ WRONG: timer.isRunning = true
✅ CORRECT: setTimer(prev => ({ ...prev, isRunning: true }))

## 2. Timer Logic
❌ WRONG: setInterval without cleanup
✅ CORRECT: useEffect with cleanup function

## 3. Sound Playback
❌ WRONG: new Audio() on every play
✅ CORRECT: Reuse preloaded audio instances

## 4. LocalStorage
❌ WRONG: Direct JSON.parse without try-catch
✅ CORRECT: Wrap in error handling with fallback

## 5. TypeScript
❌ WRONG: Using 'any' to bypass errors
✅ CORRECT: Proper typing with React types

## 6. Component Structure
❌ WRONG: Inline handler definitions (re-renders)
✅ CORRECT: useCallback for complex handlers

## 7. File Changes
❌ WRONG: Modifying unrelated files
✅ CORRECT: Only change what was requested

## 8. Feature Creep
❌ WRONG: Adding unrequested features
✅ CORRECT: Ask before adding extras
