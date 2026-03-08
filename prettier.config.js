/** @type {import('prettier').Config} */
export default {
  semi: true, // punto y coma al final — false → sin punto y coma
  singleQuote: true, // comillas simples — false → comillas dobles
  tabWidth: 2, // espacios por indentación — opciones: 2 o 4
  trailingComma: 'es5', // comas finales — "es5" → solo objetos/arrays, "none" → ninguna, "all" → todos lados
  printWidth: 120, // largo máximo de línea — 80 clásico, 100-120 para monitores anchos
  arrowParens: 'always', // paréntesis en arrows — "always" → (x) => x, "avoid" → x => x
};
