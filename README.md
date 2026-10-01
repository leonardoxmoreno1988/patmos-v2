Patmos v2

An AI-powered research platform leveraging Retrieval-Augmented Generation (RAG), vector embeddings, and multi-model LLM workflows to deliver fast, context-aware analysis and semantic search.

Live Application: patmosresearch.com

Overview
Patmos v2 is designed for intelligent research automation. By combining semantic search capabilities with high-performance vector databases, the platform retrieves relevant document contexts and generates precise, source-grounded insights. It handles end-to-end user authentication, payment subscriptions, and rate limiting to support a production-ready SaaS infrastructure.

Key Features
Retrieval-Augmented Generation (RAG): Context-aware question answering powered by semantic vector search and hybrid retrieval.

Multi-LLM Integration: Orchestrated workflows using OpenAI and Google Gemini APIs for flexible inference and processing.

Vector Storage & Database: Built on Supabase (PostgreSQL) for scalable vector embeddings, relational data storage, and Row-Level Security (RLS).

Caching & Rate Limiting: Serverless Redis infrastructure powered by Upstash to handle request throttling and optimize query response times.

Monetization & Webhooks: Integrated billing pipeline using LemonSqueezy with automated webhook verification for subscription management.

Authentication: Secure user login and identity management supporting Google OAuth via Supabase Auth.

Tech Stack
Frontend / Framework: Next.js / React, TypeScript, Tailwind CSS

AI & Embeddings: OpenAI API, Google Gemini API

Database & Authentication: Supabase (PostgreSQL, Pgvector, Supabase Auth)

Caching & Performance: Upstash Redis

Payment Infrastructure: LemonSqueezy

Deployment & Hosting: Vercel

Environment Variables Configuration
To run Patmos v2 locally, create a .env.local file in the root directory and configure the following key-value pairs:
