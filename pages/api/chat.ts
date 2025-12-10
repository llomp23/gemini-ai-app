import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

// Validacao basica de entrada
function validateInput(message: string): string | null {
  if (!message) return null;
  if (message.length > 2000) return null;
  return message.trim();
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const RESPONSE_TIMEOUT = 55000; // 55 segundos

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  if (!process.env.GOOGLE_AI_API_KEY) {
    return res.status(500).json({ error: 'Servidor nao configurado' });
  }

  const { message } = req.body;
  const validatedMessage = validateInput(message);

  if (!validatedMessage) {
    return res.status(400).json({ error: 'Mensagem invalida' });
  }

  const timeoutId = setTimeout(() => {}, RESPONSE_TIMEOUT);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(validatedMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({
      success: true,
      response: text || 'Nenhuma resposta',
    });
  } catch (error: any) {
    const isTimeout = error?.message?.includes('timeout') || error?.message?.includes('abort');
    const isRateLimit = error?.status === 429;

    if (isTimeout) {
      return res.status(504).json({ error: 'Resposta demorou muito. Tente novamente.' });
    }
    if (isRateLimit) {
      return res.status(429).json({ error: 'Muitas requisicoes. Aguarde alguns minutos.' });
    }

    return res.status(500).json({ error: 'Erro ao processar. Tente novamente.' });
  } finally {
    clearTimeout(timeoutId);
  }
}
