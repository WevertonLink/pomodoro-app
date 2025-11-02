# UI Patterns & Design System

## Color Palette
- Primary (Red): Work/Focus sessions
- Success (Green): Break sessions
- Accent (Purple): Achievements

## Typography
- Headings: font-bold, tracking-tight
- Body: font-normal, leading-relaxed
- Timer: tabular-nums (monospace numbers)

## Component Patterns

### Timer Display
Circular progress ring with centered time display, mode badge, and control buttons.

### Stats Card
Card component with header, content area showing metrics, progress bars.

### Settings Panel
Tabbed interface for Timer, Sounds, and Notifications settings.

## Animation Patterns
- Page transitions: fade + slide
- Timer pulse when running
- Smooth progress updates

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Dark Mode
Use Tailwind's dark: prefix for all color classes

## Accessibility
- ARIA labels on all buttons
- Timer state announcements
- Keyboard shortcuts
- Focus indicators
