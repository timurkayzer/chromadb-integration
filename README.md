# ChromaDB Integration Test

This project is a demonstration of integrating custom data into [ChromaDB](https://www.trychroma.com/) and building a responding system that performs semantic search over that data. In this specific case, the project uses information about the American indie rock band **Les Savy Fav**.

## Features

- **Custom Data Integration**: Scrapes or uses text data (about the band Les Savy Fav) and stores it in ChromaDB.
- **Semantic Search**: Uses OpenAI's `text-embedding-ada-002` model to generate embeddings for both data and queries, allowing for meaning-based retrieval instead of just keyword matching.
- **Interactive CLI**: A simple command-line interface to ask questions about the stored data.
- **Robust Connection Handling**: Optimized to handle common ChromaDB 3.x pitfalls (like the default embedding package requirement).

## Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js.
- A running [ChromaDB](https://docs.trychroma.com/getting-started) server.
- An [OpenAI API Key](https://platform.openai.com/).

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chromadb-integration
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   CHROMADB_HOST=localhost
   CHROMADB_PORT=8000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

### 1. Import Data
To seed the ChromaDB collection with information from `input.txt`, run the import script:
```bash
bun run import
```
This script reads `input.txt`, splits the text into sentences/documents, generates embeddings via OpenAI, and saves them into a collection named `infos`.

### 2. Query Data
To start the interactive CLI and ask questions about the band:
```bash
bun start
```
Type your question and press Enter. The system will retrieve the most relevant information from ChromaDB and display it.

## Project Structure

- `src/chroma-service.ts`: A wrapper service for ChromaDB operations, including collection management and querying.
- `src/import-data.ts`: Script to process `input.txt` and populate the vector database.
- `src/index.ts`: The main entry point for the interactive query system.
- `input.txt`: The source text containing facts about Les Savy Fav.

## Technical Details

- **Embedding Function**: `OpenAIEmbeddingFunction` from `@chroma-core/openai`.
- **Database**: ChromaDB (Vector Database).
- **Runtime**: Bun (supports TypeScript out of the box).
