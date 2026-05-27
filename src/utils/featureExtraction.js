export function extraerCaracteristicas(password) {
  const longitud = password.length;
  const numeros = (password.match(/[0-9]/g) || []).length;
  const especiales = (password.match(/[!@#$%^&*(),.?":{}|<>_\-+=]/g) || []).length;
  const mayusculas = (password.match(/[A-ZÁÉÍÓÚÑ]/g) || []).length;
  const minusculas = (password.match(/[a-záéíóúñ]/g) || []).length;

  const patronesProhibidos =
    /(1234|12345|123456|qwerty|admin|password|abcd|1111|0000|peru|luis)/i.test(password);

  return {
    longitud,
    numeros,
    especiales,
    mayusculas,
    minusculas,
    patronesProhibidos,
  };
}