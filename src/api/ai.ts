import { api } from './client';

export async function ask(prompt: string): Promise<string> {
  const { data } = await api.post<string>('/ai/ask', { prompt });
  return data ?? '';
}

export async function summarizeWithText(text: string, prompt?: string): Promise<string> {
  const body: { text: string; prompt?: string } = { text };
  if (prompt?.trim()) body.prompt = prompt.trim();
  const { data } = await api.post<string>('/ai/summarize', body);
  return data ?? '';
}

export async function summarizeWithFile(file: File, prompt?: string): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  if (prompt?.trim()) form.append('prompt', prompt.trim());
  const { data } = await api.post<string>('/ai/summarize', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data ?? '';
}
