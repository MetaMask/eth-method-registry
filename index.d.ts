declare module 'eth-method-registry' {

    export class MethodRegistry {
        constructor(opts: object)

        lookup(bytes: string): void
        parse(signature: string): void
    }
}