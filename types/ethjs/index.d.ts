declare module 'ethjs' {
  class Eth {
    constructor(provider: any);

    contract(abi: Record<string, unknown>): RegistryContract;
  }
  interface RegistryContract {
    at (address: string): DeployedRegistryContract;
  }
  interface DeployedRegistryContract {
    entries (bytes: string): string[];
  }
  export=Eth;
}
