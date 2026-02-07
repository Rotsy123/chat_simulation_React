import { useState, useRef, useEffect } from 'react';
import { ask } from '../api/ai';

type Message = { role: 'user' | 'assistant'; content: string };

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError(null);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const reply = await ask(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur lors de l\'envoi.';
      setError(msg);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Erreur : ${msg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel chat-panel">
      <div className="panel-header">
        <h2>Chat</h2>
        <p>Pose une question, l’IA répond.</p>
      </div>

      <div className="chat-messages" ref={listRef}>
        {messages.length === 0 && (
          <div className="chat-placeholder">
            Écris un message pour commencer…
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`message message--${m.role}`}>
            <span className="message-role">{m.role === 'user' ? 'Toi' : 'IA'}</span>
            <div className="message-content">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message message--assistant">
            <span className="message-role">IA</span>
            <div className="message-content typing">Réflexion…</div>
          </div>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="chat-input-wrap">
        <textarea
          className="chat-input"
          placeholder="Écris ton message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={2}
          disabled={loading}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={send}
          disabled={loading || !input.trim()}
        >
          Envoyer
        </button>
      </div>
    </section>
  );
}
