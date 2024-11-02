import { withSentryConfig } from '@sentry/nextjs'
/** @type {import('next').NextConfig} */
const nextConfig = {}

const config =
  process.env.NODE_ENV === 'production'
    ? withSentryConfig(nextConfig, {
        org: 'chu-z0',
        project: 'genomyc',
        silent: !process.env.CI,
        reactComponentAnnotation: {
          enabled: true,
        },
        tunnelRoute: '/monitoring',
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
        widenClientFileUpload: false,
      })
    : nextConfig

export default config
