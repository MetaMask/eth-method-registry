import type { Provider } from '@ethersproject/abstract-provider';
import { Contract } from '@ethersproject/contracts';

import abi from './abi.json';
import registryMap from './registry-map.json';

interface MethodRegistryArgs {
  network: string;
  provider: Provider;
}

export class MethodRegistry {
  provider: Provider;

  registry: Contract;

  constructor(opts: MethodRegistryArgs) {
    if (!opts.provider) {
      throw new Error("Missing required 'provider' option");
    }
    this.provider = opts.provider;
    const address = (registryMap as Record<string, string>)[opts.network || '1'];

    if (!address) {
      throw new Error('No method registry found on the requested network.');
    }

    this.registry = new Contract(address, abi, this.provider);
  }

  /**
 * @param bytes - The `0x`-prefixed hexadecimal string representing the four-byte signature of the contract method to lookup.
 */
  async lookup(bytes: string) {
    const result: string | undefined = await this.registry.entries(bytes);
    if (result) {
      return result;
    }
    return undefined;
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
      const match = signature.match(new RegExp(`${rawName[1]}\\(+([a-z1-9,()\\[\\]]+)\\)`, 'u'));
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
