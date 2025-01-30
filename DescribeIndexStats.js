// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.API_KEY });

// Target the index where you'll store the vector embeddings
const index = pc.index('20250129-example-index');

const stats = await index.describeIndexStats();

console.log(stats)
