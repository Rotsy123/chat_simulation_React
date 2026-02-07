import { useState } from 'react';
import { Chat } from './components/Chat';
import { Summarize } from './components/Summarize';
import './App.css';

type Tab = 'chat' | 'summarize';

export default function App() {
  const [tab, setTab] = useState<Tab>('chat');

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">AI Chat</h1>
        <nav className="nav">
          <button
            type="button"
            className={`nav-tab ${tab === 'chat' ? 'nav-tab--active' : ''}`}
            onClick={() => setTab('chat')}
          >
            Chat
          </button>
          <button
            type="button"
            className={`nav-tab ${tab === 'summarize' ? 'nav-tab--active' : ''}`}
            onClick={() => setTab('summarize')}
          >
            Résumé
          </button>
        </nav>
      </header>

      <main className="main">
        {tab === 'chat' && <Chat />}
        {tab === 'summarize' && <Summarize />}
      </main>
    </div>
  );
}
