// Helpers para validar fuerza de contraseña estilo IsStrongPassword
export function countRe(regex: RegExp, s: string) {
  const m = s.match(new RegExp(regex, "g"));
  return m ? m.length : 0;
}

export function validateStrongPassword(pwd: string) {
  const minLength = pwd.length >= 8;
  const lower = /[a-z]/.test(pwd);
  const upper = /[A-Z]/.test(pwd);
  const number = /\d/.test(pwd);
  const symbolsCount = countRe(/[^A-Za-z0-9]/, pwd); // símbolos = 2+
  const symbols = symbolsCount >= 2;
  return {
    ok: minLength && lower && upper && number && symbols,
    detail: { minLength, lower, upper, number, symbols, symbolsCount },
  };
}
