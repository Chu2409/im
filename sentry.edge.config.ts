import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.0,
  maxBreadcrumbs: 10,
  beforeSend(event) {
    if (event.exception && event.exception.values) {
      event.exception.values.forEach((exception) => {
        if (exception.stacktrace) {
          if (exception.stacktrace.frames) {
            exception.stacktrace.frames = exception.stacktrace.frames
              .slice(-5)
              .filter(
                (frame) =>
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
