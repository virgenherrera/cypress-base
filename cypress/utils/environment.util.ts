import { EnvSet } from './env-set.util';

export class Environment {
  @EnvSet('E2E_BASE_URL', true)
  e2eBaseUrl: string;
}

export default new Environment();
