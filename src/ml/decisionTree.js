export function clasificarConArbolDecision(caracteristicas) {
  const {
    longitud,
    numeros,
    especiales,
    mayusculas,
    minusculas,
    patronesProhibidos,
  } = caracteristicas;

  // VALIDACIÓN CUANDO ESTÁ VACÍO
  if (longitud === 0) {
    return {
      puntaje: 0,
      nivel: "Sin evaluar",
      color: "bg-slate-500",
      textoColor: "text-slate-300",
      descripcion:
        "Escribe una contraseña para iniciar el análisis inteligente.",

      consejos: [
        "El análisis se realiza localmente sin enviar datos a servidores.",
      ],
    };
  }

  let puntaje = 0;
  const consejos = [];

  // LONGITUD
  if (longitud >= 8) {
    puntaje += 20;
  } else {
    consejos.push("Usa como mínimo 8 caracteres.");
  }

  // LONGITUD AVANZADA
  if (longitud >= 12) {
    puntaje += 15;
  } else {
    consejos.push("Para mayor seguridad usa 12 caracteres o más.");
  }

  // NÚMEROS
  if (numeros > 0) {
    puntaje += 15;
  } else {
    consejos.push("Agrega números.");
  }

  // ESPECIALES
  if (especiales > 0) {
    puntaje += 20;
  } else {
    consejos.push(
      "Agrega caracteres especiales como @, #, $, % o *."
    );
  }

  // MAYÚSCULAS Y MINÚSCULAS
  if (mayusculas > 0 && minusculas > 0) {
    puntaje += 15;
  } else {
    consejos.push("Combina mayúsculas y minúsculas.");
  }

  // PATRONES PELIGROSOS
  if (!patronesProhibidos) {
    puntaje += 15;
  } else {
    consejos.push(
      "Evita patrones comunes como 1234, qwerty o admin."
    );
  }

  // VALORES POR DEFECTO
  let nivel = "Débil";
  let color = "bg-red-500";
  let textoColor = "text-red-400";

  let descripcion =
    "Contraseña vulnerable. Puede ser fácil de adivinar.";

  // MEDIA
  if (puntaje >= 40 && puntaje < 70) {
    nivel = "Media";
    color = "bg-yellow-400";
    textoColor = "text-yellow-300";

    descripcion =
      "Contraseña aceptable, pero todavía puede mejorar.";
  }

  // SEGURA
  if (puntaje >= 70 && puntaje < 90) {
    nivel = "Segura";
    color = "bg-emerald-400";
    textoColor = "text-emerald-300";

    descripcion =
      "Contraseña segura con buena combinación de caracteres.";
  }

  // MUY SEGURA
  if (puntaje >= 90) {
    nivel = "Muy segura";
    color = "bg-cyan-400";
    textoColor = "text-cyan-300";

    descripcion =
      "Contraseña muy robusta y difícil de predecir.";
  }

  return {
    puntaje: Math.min(puntaje, 100),
    nivel,
    color,
    textoColor,
    descripcion,

    consejos:
      consejos.length > 0
        ? consejos
        : [
            "Excelente. La contraseña cumple buenas condiciones de seguridad.",
          ],
  };
}