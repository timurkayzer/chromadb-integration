import {ChromaService} from "./chroma-service";
import { OpenAIEmbeddingFunction } from "@chroma-core/openai";
import fs from 'fs/promises';

(async function main() {
    if(!process.env.CHROMADB_HOST || !process.env.CHROMADB_PORT) throw new Error("CHROMA_HOST and CHROMA_PORT environment variables must be set");

    const chromaService = new ChromaService(
        process.env.CHROMADB_HOST,
        Number.parseInt(process.env.CHROMADB_PORT),
        new OpenAIEmbeddingFunction({
            apiKey: process.env.OPENAI_API_KEY,
            modelName: "text-embedding-ada-002",
        })
    );

    const data = await fs.readFile("input.txt", "utf-8");
    const documents = data.split(".").map(d => d.trim()).filter(d => d.length > 0);
    await chromaService.saveData("infos", {documents});
})()

