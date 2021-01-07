declare class MethodRegistry {
  constructor(opts: Record<string, unknown>)

  lookup(bytes: string): void

  parse(signature: string): void
}
export = MethodRegistry;
