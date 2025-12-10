# 🤖 Gemini AI App

Aplicacao de chat com integracao Google Gemini Flash 1.5, Next.js 14, Supabase e NextAuth.

## Recursos

- Chat em tempo real com Google Gemini
- Validacao de entrada segura
- Rate limiting integrado
- Tratamento de erros robusto
- Limite de tokens para otimizar custos
- Interface responsiva
- Autenticacao com NextAuth (em desenvolvimento)

## Instalacao

### Prerequisitos

- Node.js 18+
- npm ou yarn
- Conta Google Cloud (para Gemini API)
- Conta Supabase (opcional)

### Passos

1. Clone o repositorio:
```bash
git clone https://github.com/llomp23/gemini-ai-app.git
cd gemini-ai-app
```

2. Instale as dependencias:
```bash
npm install
```

3. Configure as variaveis de ambiente:
```bash
cp .env.example .env.local
```

4. Edite `.env.local` com suas chaves:
```
GOOGLE_AI_API_KEY=sua_chave_aqui
NEXTAUTH_SECRET=seu_secret_aleatorio
NEXTAUTH_URL=http://localhost:3000
```

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

6. Abra http://localhost:3000 no navegador

## Correcoes de Seguranca Implementadas

✅ Validacao de entrada de mensagens
✅ Rate limiting (30 requisicoes por 15 minutos)
✅ Limite de tamanho de resposta (500 tokens)
✅ Timeout aumentado para 30 segundos
✅ Tratamento seguro de erros
✅ Nao expoe detalhes internos do servidor

## Estrutura do Projeto

```
gemini-ai-app/
├── pages/
│   ├── api/
│   │   ├── chat.ts          # Endpoint da API (CORRIGIDO)
│   │   └── auth/            # NextAuth (em desenvolvimento)
│   ├── index.tsx            # Pagina inicial
│   ├── dashboard.tsx        # Interface de chat
│   └── login.tsx            # Login (em desenvolvimento)
├── .env.example             # Template de variaveis
├── package.json             # Dependencias
└── next.config.js           # Configuracao Next.js
```

## Configuracao para Producao

### Vercel

1. Push seu codigo para GitHub
2. Conecte seu repositorio no Vercel
3. Configure as variaveis de ambiente:
   - `GOOGLE_AI_API_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (URL do seu dominio)
4. Deploy automatico em cada push

### Variaveis de Ambiente Necessarias

```
# Gemini API
GOOGLE_AI_API_KEY=sk-...

# NextAuth
NEXTAUTH_SECRET=algo_muito_secreto
NEXTAUTH_URL=https://seu-dominio.com

# Supabase (opcional)
NEXT_PUBLIC_SUPABASE_URL=https://seu-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=seu_chave_publica
SUPABASE_SERVICE_ROLE_KEY=sua_chave_privada
```

## Monitoramento de Custos

O Gemini Flash 1.5 e muito barato, mas para monitorar:

1. Acesse Google Cloud Console
2. Vá para Billing
3. Configure alertas de limite de gastos

## Desenvolvimento

### Scripts Disponiveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para producao
npm run start    # Inicia servidor de producao
npm run lint     # Lint do codigo
```

### Dependencias Principais

- `@google/generative-ai`: SDK do Gemini
- `express-rate-limit`: Rate limiting
- `next-auth`: Autenticacao
- `@supabase/supabase-js`: Cliente Supabase
- `next`: Framework React

## Proximos Passos

- [ ] Implementar NextAuth com Supabase
- [ ] Adicionar historico de conversa
- [ ] Melhorar interface mobile
- [ ] Adicionar upload de arquivos
- [ ] Implementar dark mode
- [ ] Adicionar analytics

## Troubleshooting

### Erro: "GOOGLE_AI_API_KEY nao configurada"

Certifique-se de que `.env.local` existe e tem a chave configurada.

### Erro: "Muitas requisicoes"

Espere 15 minutos ou resete o rate limiter (reinicie o servidor em dev).

### Deploy no Vercel retorna 404

1. Verifique se as variaveis estao configuradas no Vercel
2. Faca um novo deploy
3. Verifique os logs no Vercel Dashboard

## Licenca

MIT

## Suporte

Para problemas, abra uma issue no GitHub ou entre em contato.

---

**Ultima atualizacao**: 10 de Dezembro de 2025
**Status de Seguranca**: ✅ Corrigido e validado
