export = MethodRegistry
declare class MethodRegistry {
    constructor(opts: object)

    lookup(bytes: string): void
    parse(signature: string): void
}