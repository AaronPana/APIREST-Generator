import pluralize from 'pluralize';
import { ResourceNames } from './types.js';
import { capitalize } from '../utils/format.js';

export function buildResourceNames(raw: string): ResourceNames {
  const singular = pluralize.singular(raw.trim().toLowerCase());
  const plural = pluralize.plural(singular);
  const pascalCase = capitalize(singular);
  const upperCase = singular.toUpperCase();

  return { singular, plural, pascalCase, upperCase };
}
