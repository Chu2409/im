import { withSentryConfig } from '@sentry/nextjs'
/** @type {import('next').NextConfig} */
const nextConfig = {}

const config = withSentryConfig(nextConfig, {
  org: 'chu-z0',
  project: 'genomyc',
  silent: !process.env.CI,
  reactComponentAnnotation: {
    enabled: true,
  },
  sourcemaps: {
    disable: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  widenClientFileUpload: false,
})

export default config
