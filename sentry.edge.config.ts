import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.0,
  maxBreadcrumbs: 10,
  beforeSend(event) {
    if (event.exception && event.exception.values) {
      event.exception.values.forEach((exception) => {
        if (exception.stacktrace) {
          // Mantener solo los frames más relevantes (por ejemplo, los primeros 5)
          if (exception.stacktrace.frames) {
            exception.stacktrace.frames = exception.stacktrace.frames
              .slice(-5) // Mantener solo los últimos 5 frames
              .filter(
                (frame) =>
                  // Filtrar frames internos de Next.js y node_modules
                  !frame.filename?.includes('node_modules') &&
                  !frame.filename?.includes('webpack-internal') &&
                  !frame.filename?.includes('next/dist'),
              )
          }
        }
      })
    }
    return event
  },
  ignoreErrors: [
    'Network request failed',
    'Load failed',
    /^ResizeObserver/,
    /^ChunkLoadError/,
  ],
})
