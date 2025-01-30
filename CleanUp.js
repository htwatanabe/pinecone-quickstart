// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.API_KEY });

// Create a serverless index
const indexName = "20250129-example-index"

await pc.deleteIndex(indexName);
