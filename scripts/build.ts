import { execSync } from 'child_process';
import fs from 'fs-extra';

execSync('tsc', { stdio: 'inherit' });
console.log('TypeScript compiled successfully');
await fs.copy('src/templates', 'dist/templates');
console.log('Templates copied to dist/');
