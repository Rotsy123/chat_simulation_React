import { useState } from 'react';
import { summarizeWithText, summarizeWithFile } from '../api/ai';

type Mode = 'text' | 'file';

export function Summarize() {
  const [mode, setMode] = useState<Mode>('text');
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('Résume ce texte de manière concise');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      if (mode === 'file' && file) {
        const res = await summarizeWithFile(file, prompt || undefined);
        setResult(res);
      } else if (mode === 'text' && text.trim()) {
        const res = await summarizeWithText(text, prompt || undefined);
        setResult(res);
      } else {
        setError(
          mode === 'file'
            ? 'Choisis un fichier.'
            : 'Saisis du texte ou colle-le dans la zone.',
        );
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur lors du résumé.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel summarize-panel">
      <div className="panel-header">
        <h2>Résumé</h2>
        <p>Colle du texte ou envoie un fichier, et personnalise l’instruction.</p>
      </div>

      <div className="summarize-mode">
        <button
          type="button"
          className={`tab ${mode === 'text' ? 'tab--active' : ''}`}
          onClick={() => setMode('text')}
        >
          Texte
        </button>
        <button
          type="button"
          className={`tab ${mode === 'file' ? 'tab--active' : ''}`}
          onClick={() => setMode('file')}
        >
          Fichier
        </button>
      </div>

      <div className="summarize-inputs">
        <label className="label">Instruction (optionnel)</label>
        <input
          type="text"
          className="input"
          placeholder="Ex : Résume en 3 points, Fais un résumé détaillé…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {mode === 'text' ? (
          <>
            <label className="label">Texte à résumer</label>
            <textarea
              className="textarea"
              placeholder="Colle ton texte ici…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
            />
          </>
        ) : (
          <>
            <label className="label">Fichier</label>
            <div className="file-upload">
              <input
                type="file"
                accept=".txt,.md,.json"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {file && <span className="file-name">{file.name}</span>}
            </div>
          </>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      <button
        type="button"
        className="btn btn-primary"
        onClick={run}
        disabled={
          loading ||
          (mode === 'text' ? !text.trim() : !file)
        }
      >
        {loading ? 'Résumé en cours…' : 'Résumer'}
      </button>

      {result && (
        <div className="summarize-result">
          <h3>Résultat</h3>
          <div className="result-content">{result}</div>
        </div>
      )}
    </section>
  );
}
