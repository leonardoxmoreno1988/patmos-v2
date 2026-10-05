# Patmos v2 🚀

> **An AI-powered research platform** An AI-powered research platform leveraging multi-query RAG, vector embeddings (pgvector), and agentic tool-calling to deliver fast, context-aware analysis and semantic search.

🌐 **Live Application:** [patmosresearch.com](https://patmosresearch.com)

---

## 📌 Overview

**Patmos v2** is engineered for intelligent research automation. By combining semantic search capabilities with vector databases, the platform retrieves relevant document contexts and generates precise, source grounded insights. 

It features a production ready SaaS infrastructure with end-to-end user authentication, automated payment subscriptions, and serverless rate limiting.

---

## ✨ Key Features

- 🤖 **Retrieval-Augmented Generation (RAG):** Context-aware question answering powered by semantic vector search and hybrid retrieval.
- ⚡ **Agentic RAG & Tool Calling:** Orchestrated multi-query vector retrieval and native function-calling using OpenAI (gpt-4o) and Supabase (pgvector) for high-precision, context-bounded responses.
- 🗄️ **Vector Storage & Database:** Built on **Supabase (PostgreSQL)** for scalable vector embeddings (`pgvector`), relational storage, and Row-Level Security (RLS).
- 🚀 **Caching & Rate Limiting:** Serverless Redis infrastructure powered by **Upstash** to handle request throttling and optimize query response times.
- 💳 **Monetization & Webhooks:** Integrated billing pipeline using **LemonSqueezy** with automated webhook verification for subscription management.
- 🔐 **Authentication:** Secure user login and identity management supporting **Google OAuth** via Supabase Auth.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend & Framework** | Next.js, React, TypeScript, Tailwind CSS |
| **AI & Embeddings** | OpenAI API |
| **Database & Auth** | Supabase (PostgreSQL, `pgvector`, Supabase Auth) |
| **Caching & Performance** | Upstash Redis |
| **Payments & Billing** | LemonSqueezy |
| **Deployment & Hosting** | Vercel |
