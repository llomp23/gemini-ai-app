import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('Bem-vindo ao Gemini AI App')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
      <div style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🤖 Gemini AI App</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#ccc' }}>Aplicação com Supabase, Gemini Flash e Next.js</p>
        <p style={{ fontSize: '1.5rem', color: '#60a5fa' }}>{message}</p>
        <p style={{ marginTop: '40px', color: '#888', fontSize: '0.9rem' }}>✅ Infraestrutura em produção no Vercel</p>
      </div>
    </div>
  )
}
