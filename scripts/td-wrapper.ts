import fs from 'fs'
import path from 'path'
import { testDeploy } from './test-deploy'

function getArgUrl(): string | undefined {
  const argv = process.argv.slice(2)
  if (argv.length > 0 && argv[0]) return argv[0]

  const npmArgv = process.env.npm_config_argv
  if (npmArgv) {
    try {
      const parsed = JSON.parse(npmArgv as string)
      if (Array.isArray(parsed.original) && parsed.original.length > 2) {
        return parsed.original.slice(2).join(' ')
      }
    } catch (e) {
      // ignore
    }
  }
  return undefined
}

function getConfigUrl(): string | undefined {
  try {
    const cfgPath = path.resolve(process.cwd(), 'instanceProviderConfig.json')
    if (!fs.existsSync(cfgPath)) return undefined
    const raw = fs.readFileSync(cfgPath, 'utf8')
    const cfg = JSON.parse(raw)
    return cfg && cfg.url ? String(cfg.url) : undefined
  } catch (e) {
    return undefined
  }
}

async function main(): Promise<void> {
  let url = getArgUrl()
  if (!url) url = getConfigUrl()

  if (!url) {
    console.error('No instance provider URL provided and instanceProviderConfig.json missing url')
    console.error('Usage: pnpm run td -- <instanceProviderUrl>')
    process.exit(1)
  }

  try {
    await testDeploy({ instanceProvider: url })
    process.exit(0)
  } catch (err) {
    console.error('test-deploy failed:', err)
    process.exit(1)
  }
}

void main()
