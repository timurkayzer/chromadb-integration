import {ChromaService} from "./chroma-service";
import {OpenAIEmbeddingFunction} from "@chroma-core/openai";


if(!process.env.CHROMADB_HOST || !process.env.CHROMADB_PORT) throw new Error("CHROMA_HOST and CHROMA_PORT environment variables must be set");
const chromaService = new ChromaService(
    process.env.CHROMADB_HOST,
    Number.parseInt(process.env.CHROMADB_PORT),
    new OpenAIEmbeddingFunction({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: "text-embedding-ada-002",
    })
);

console.log("Ask me anything about Les Savy Fav:");

async function main(data: Buffer) {
    const message = data.toString();
    const retrievedDocuments = await chromaService.getData("infos", message);
    console.log(retrievedDocuments.documents[0][0]);
}

process.stdin.on("data", main);