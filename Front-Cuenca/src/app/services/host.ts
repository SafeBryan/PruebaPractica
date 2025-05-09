// host.ts
const isProduction = true; // o usa environment.production si tienes configurado Angular environments

export const config = {
  node: {
    host: 'hospital-central.duckdns.org',
    port: 443,
    basePath: '/api',
    protocol: 'https',
  },
  spring: {
    host: 'hospital-cuenca.duckdns.org',
    port: 443,
    basePath: '',
    protocol: 'https',
  },
};

export function buildUrl(service: 'node' | 'spring', path: string): string {
  const { host, port, basePath, protocol } = config[service];
  const defaultPort = protocol === 'https' ? 443 : 80;
  const portPart = port === defaultPort ? '' : `:${port}`;
  const base = `${protocol}://${host}${portPart}${basePath}`;
  return `${base}${path}`;
}
