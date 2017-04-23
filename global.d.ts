
declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: {}[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

declare var process: {
  env: {
    NODE_ENV: string
  }
}
