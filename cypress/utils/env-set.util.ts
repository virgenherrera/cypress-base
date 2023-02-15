import * as dotenv from 'dotenv';

export function EnvSet(
  ENV_VAR: string,
  throwIfNotFound = false,
): PropertyDecorator {
  dotenv.config();

  const value = process.env[ENV_VAR];

  if (throwIfNotFound && !value) {
    throw new Error(
      `Unable to locate "${ENV_VAR}" environment Variable.` +
        '\n\tplease provide it and try to run again.\n\n',
    );
  }

  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      value,
    });
  };
}
