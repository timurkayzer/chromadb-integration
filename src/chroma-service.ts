import {ChromaClient} from "chromadb";
import {OpenAI} from "openai";

export class ChromaService {
    private host: string;
    private port: number;
    private connection: ChromaClient;
    private embeddingFunction: any;

    constructor(host: string, port: number, embeddingFunction: any) {
        this.host = host;
        this.port = port;
        this.embeddingFunction = embeddingFunction;

        this.connection = new ChromaClient({
            host: this.host,
            port: this.port
        });
    }

    async saveData(collectionName: string, data: {documents: string[]}) {
        const collection = await this.connection.getCollection({
            name: collectionName,
            embeddingFunction: this.embeddingFunction
        })
    }

    async getData(collectionName: string, search: string) {
    }
}