// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.API_KEY });

// Target the index where you'll store the vector embeddings
const index = pc.index('20250129-example-index');

// Define your query
const query = [
    'Tell me about the tech company known as Apple.',
];

// Convert the text into numerical vectors that Pinecone can index
const model = 'multilingual-e5-large';

// Convert the query into a numerical vector that Pinecone can search with
const queryEmbedding = await pc.inference.embed(
    model,
    query,
    { inputType: 'query' }
);

// Search the index for the three most similar vectors
const queryResponse = await index.namespace("20250129-example-namespace").query({
    topK: 3,
    vector: queryEmbedding[0].values,
    includeValues: false,
    includeMetadata: true
});

// console.log(queryResponse);
console.dir(queryResponse, { depth: null });
