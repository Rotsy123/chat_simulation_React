# AI Chat – Frontend

Interface React pour le backend AI Chat (NestJS).

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173).

**Le backend doit tourner sur le port 3000.** Le proxy Vite redirige `/api` vers `http://localhost:3000`.

## Build

```bash
npm run build
```

Pour la production, définis `VITE_API_URL` avec l’URL de ton API (ex. `https://api.example.com`) avant de builder.

## Fonctionnalités

- **Chat** : envoi de messages, réponses de l’IA.
- **Résumé** : texte ou fichier + instruction personnalisée (ex. « Résume en 3 points »).
