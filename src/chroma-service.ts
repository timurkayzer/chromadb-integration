import {ChromaClient, EmbeddingFunction} from "chromadb";

export class ChromaService {
    private host: string;
    private port: number;
    private connection: ChromaClient;
    private embeddingFunction: EmbeddingFunction;

    constructor(host: string, port: number, embeddingFunction: EmbeddingFunction) {
        this.host = host;
        this.port = port;
        this.embeddingFunction = embeddingFunction;

        this.connection = new ChromaClient({
            host: this.host,
            port: this.port
        });
    }

    async confirmCollectionExists(collectionName:string) {
        try {
            await this.connection.getCollection({
                name: collectionName,
                embeddingFunction: this.embeddingFunction
            });
        } catch (e) {
            await this.connection.createCollection({
                name: collectionName,
                embeddingFunction: this.embeddingFunction
            });
        }
    }

    async saveData(collectionName: string, data: {documents: string[]}) {
        await this.confirmCollectionExists(collectionName);
        const collection = await this.connection.getCollection({
            name: collectionName,
            embeddingFunction: this.embeddingFunction
        })

        await collection.add({
            ids:data.documents.map((_, i) => i.toString()),
            documents: data.documents
        })
    }

    async getData(collectionName: string, search: string) {
        const collection = await this.connection.getCollection({
            name: collectionName,
            embeddingFunction: this.embeddingFunction
        })

        return collection.query({
            queryTexts: [search],
            nResults: 1
        })
    }
}