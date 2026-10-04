## GitHub Copilot Chat

- Extension: 0.42.3 (prod)
- VS Code: 1.114.0 (e7fb5e96c0730b9deb70b33781f98e2f35975036)
- OS: win32 10.0.19045 x64
- GitHub Account: Ravindu08

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.205.243.168 (3 ms)
- DNS ipv6 Lookup: Error (35 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (0 ms)
- Electron fetch (configured): HTTP 200 (78 ms)
- Node.js https: HTTP 200 (235 ms)
- Node.js fetch: HTTP 200 (319 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.21 (30 ms)
- DNS ipv6 Lookup: Error (31 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (241 ms)
- Node.js https: HTTP 200 (735 ms)
- Node.js fetch: HTTP 200 (768 ms)

Connecting to https://proxy.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 138.91.182.224 (5 ms)
- DNS ipv6 Lookup: Error (30 ms): getaddrinfo ENOTFOUND proxy.individual.githubcopilot.com
- Proxy URL: None (12 ms)
- Electron fetch (configured): HTTP 200 (271 ms)
- Node.js https: HTTP 200 (883 ms)
- Node.js fetch: HTTP 200 (853 ms)

Connecting to https://mobile.events.data.microsoft.com: HTTP 404 (1435 ms)
Connecting to https://dc.services.visualstudio.com: HTTP 404 (924 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (768 ms)
Connecting to https://telemetry.individual.githubcopilot.com/_ping: HTTP 200 (764 ms)
Connecting to https://default.exp-tas.com: HTTP 400 (367 ms)

Number of system certificates: 86

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).