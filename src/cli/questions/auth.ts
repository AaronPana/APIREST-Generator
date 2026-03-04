import type { Auth, Level } from '../types.js';

export async function askAuth(level: Level): Promise<Auth> {
  return level === 'complete' ? 'jwt' : 'none';
}
