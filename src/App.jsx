import { useMemo, useState } from "react";
import { extraerCaracteristicas } from "./utils/featureExtraction";
import { clasificarConArbolDecision } from "./ml/decisionTree";

function generarPasswordSegura() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?";

  const array = new Uint32Array(16);
  window.crypto.getRandomValues(array);

  return Array.from(array)
    .map((numero) => caracteres[numero % caracteres.length])
    .join("");
}

export default function App() {
  const [password, setPassword] = useState("");
  const [mostrar, setMostrar] = useState(false);

  const caracteristicas = useMemo(
    () => extraerCaracteristicas(password),
    [password]
  );

  const resultado = useMemo(
    () => clasificarConArbolDecision(caracteristicas),
    [caracteristicas]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <section className="min-h-screen w-full flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-[390px] mx-auto">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-cyan-400/10 border border-cyan-300/30 text-cyan-200 text-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></span>
              Edge AI 
            </div>

            <h1 className="text-4xl font-black leading-tight">
              SafePass
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-300">
                Security
              </span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed mt-3">
              Clasifica contraseñas en tiempo real con árbol de decisión local
              en JavaScript.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
              <h3 className="text-lg font-bold text-cyan-300">100%</h3>
              <p className="text-[11px] text-slate-400">Local</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
              <h3 className="text-lg font-bold text-emerald-300">4</h3>
              <p className="text-[11px] text-slate-400">Niveles</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
              <h3 className="text-lg font-bold text-fuchsia-300">ML</h3>
              <p className="text-[11px] text-slate-400">Árbol JS</p>
            </div>
          </div>

          <div className="rounded-[1.7rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Analizador</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Débil · Media · Segura · Muy segura
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-2xl">
                🔐
              </div>
            </div>

            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Contraseña
            </label>

            <div className="flex rounded-2xl overflow-hidden border border-slate-600 bg-slate-950/80 focus-within:border-cyan-300 transition">
              <input
                type={mostrar ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pedro2026@"
                className="w-full bg-transparent outline-none px-4 py-3 text-sm text-white placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                className="px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold transition"
              >
                {mostrar ? "Ocultar" : "Ver"}
              </button>
            </div>

            <div className="mt-4">
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${resultado.color} rounded-full transition-all duration-500`}
                  style={{ width: `${resultado.puntaje}%` }}
                ></div>
              </div>

              <div className="flex justify-between mt-2">
                <span className={`font-black text-lg ${resultado.textoColor}`}>
                  {resultado.nivel}
                </span>
                <span className="font-bold text-slate-300 text-sm">
                  {resultado.puntaje}%
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-slate-950/70 border border-white/10 p-3">
              <p className="text-slate-300 text-xs leading-relaxed">
                {resultado.descripcion}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-3">
              <Dato titulo="Long." valor={caracteristicas.longitud} color="text-cyan-300" />
              <Dato titulo="Núm." valor={caracteristicas.numeros} color="text-emerald-300" />
              <Dato titulo="Esp." valor={caracteristicas.especiales} color="text-fuchsia-300" />
              <Dato titulo="May." valor={caracteristicas.mayusculas} color="text-yellow-300" />
              <Dato titulo="Min." valor={caracteristicas.minusculas} color="text-blue-300" />
            </div>

            <div className="mt-3 rounded-2xl bg-white/5 border border-white/10 p-3">
              <h3 className="font-bold mb-2 text-slate-100 text-sm">
                Consejos
              </h3>

              <ul className="space-y-1 text-xs text-slate-300">
                {resultado.consejos.slice(0, 3).map((consejo, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-cyan-300">✦</span>
                    <span>{consejo}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setPassword(generarPasswordSegura())}
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 text-slate-950 text-sm font-black active:scale-[0.98] transition"
            >
              Generar contraseña segura
            </button>

            <p className="text-center text-[11px] text-slate-500 mt-3">
              Privacy by Design: no se guarda ni se envía a servidores.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Dato({ titulo, valor, color }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-2 text-center">
      <strong className={`block text-base ${color}`}>{valor}</strong>
      <p className="text-[10px] text-slate-400">{titulo}</p>
    </div>
  );
}