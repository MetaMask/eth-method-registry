import Eth from 'ethjs';
import registryMap from './registry-map.json';
import abi from './abi.json';

interface HttpProvider {
  host: string;
  timeout: number;
}

interface Provider {
  network: string;
  provider: HttpProvider;
}

interface DeployedRegistryContract {
  entries (bytes: Uint8Array): unknown[];
}

export class MethodRegistry {
  eth: Eth;

  provider: HttpProvider;

  registry: DeployedRegistryContract;

  constructor(opts: Provider) {
    if (!opts.provider) {
      throw new Error("Missing required 'provider' option");
    }
    this.provider = opts.provider;
    this.eth = new Eth(this.provider);
    const address = (registryMap as Record<string, string>)[opts.network || '1'];

    if (!address) {
      throw new Error('No method registry found on the requested network.');
    }

    this.registry = this.eth.contract(abi as any).at(address);
  }

  async lookup(bytes: any) {
    const result = await this.registry.entries(bytes);
    return result[0];
  }

  parse(signature: string) {
    const rawName = signature.match(/^([^)(]*)\((.*)\)([^)(]*)$/u);
    let parsedName;

    if (rawName) {
      parsedName = rawName[1].charAt(0).toUpperCase() + rawName[1].slice(1).split(/(?=[A-Z])/u).join(' ');
    } else {
      parsedName = '';
    }

    if (rawName) {
      const match = signature.match(new RegExp(`${rawName[1]}\\(+([a-z1-9,()]+)\\)`, 'u'));
      let matches;
      let args: { type: string }[] = [];
      if (match) {
        matches = match[1].match(/[A-z1-9]+/gu);
        if (matches) {
          args = matches.map((arg) => {
            return { type: arg };
          });
        }
      }
      return {
        name: parsedName,
        args,
      };
    }

    return {};
  }

}
