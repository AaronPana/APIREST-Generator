import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  // ── BASE ──────────────────────────────────────────────────────────────
  js.configs.recommended,
  // Reglas recomendadas de ESLint puro — detecta errores comunes de JS.

  ...tseslint.configs.recommended,
  // Reglas recomendadas de typescript-eslint — extiende las de JS con reglas de TS.
  // Alternativa más estricta: tseslint.configs.strict (más reglas, más ruido).

  {
    // ── ENVIRONMENT ─────────────────────────────────────────────────────
    languageOptions: {
      globals: globals.node,
      // Define las variables globales disponibles (process, __dirname, etc).
      // globals.browser → variables del browser (window, document).
      // globals.node    → variables de Node.js.
      parserOptions: {
        project: './tsconfig.json', // ← acá, le dice dónde está el tsconfig
      },
    },

    // ── RULES ────────────────────────────────────────────────────────────
    rules: {
      // ── JAVASCRIPT ────────────────────────────────────────────────────

      'no-console': 'off',
      // Permite usar console.log, console.error, etc.
      // 'warn' → advertencia. 'error' → error. 'off' → desactivado.
      // En APIs es común usarlo, por eso lo desactivamos.

      'no-unused-vars': 'off',
      // Desactivamos la regla base de JS para usar la de TypeScript en su lugar.
      // Si no la desactivás, ambas corren al mismo tiempo y se duplican los errores.

      eqeqeq: ['error', 'always'],
      // Obliga el uso de === y !== en lugar de == y !=.
      // Evita comparaciones con coerción de tipos inesperada.

      // 'no-implicit-coercion': 'error',
      // Prohíbe conversiones de tipo implícitas como !!value o +str.
      // Obliga a usar Boolean(value) o Number(str). Más explícito pero más verbose.

      // 'no-shadow': 'error',
      // Error si una variable en un scope interno tiene el mismo nombre que una externa.
      // Puede ser útil pero a veces es molesto con nombres comunes como 'error' en catch.

      // ── TYPESCRIPT ────────────────────────────────────────────────────

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          // Parámetros que empiezan con _ no dan error de unused.
          // Permite usar _req, _next en Express sin advertencias.
          varsIgnorePattern: '^_',
          // Lo mismo para variables locales.
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      // Advertencia cuando usás el tipo any explícitamente.
      // 'error' si querés prohibirlo completamente.
      // 'off' si no querés que moleste.

      '@typescript-eslint/explicit-function-return-type': 'warn',
      // Obliga a declarar el tipo de retorno en todas las funciones.
      // Muy útil para código de librería pero verbose para uso interno.

      // '@typescript-eslint/explicit-module-boundary-types': 'warn',
      // Obliga a tipar los parámetros y retorno de funciones exportadas.
      // Similar a la anterior pero solo en exports.

      '@typescript-eslint/no-floating-promises': 'error',
      // Error si llamás a una función async sin await o .catch().
      // Evita promises ignoradas que pueden fallar silenciosamente.
      // Requiere configurar parserOptions.project para funcionar.

      '@typescript-eslint/no-misused-promises': 'error',
      // Error si pasás una promise donde no se espera una (como en if o callbacks).
      // Requiere configurar parserOptions.project para funcionar.
    },
  },

  // ── IGNORED FILES ──────────────────────────────────────────────────────
  {
    ignores: [
      'dist/',
      // No lintear el código compilado.
      'node_modules/',
      // No lintear dependencias.
      '*.config.js',
      // No lintear archivos de configuración (este mismo archivo).
    ],
  },
);
