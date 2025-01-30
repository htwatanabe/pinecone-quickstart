// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.API_KEY });

// Target the index where you'll store the vector embeddings
const index = pc.index('20250129-example-index');

const data = [
    { id: 'vec1', text: 'Apple is a popular fruit known for its sweetness and crisp texture.' },
    { id: 'vec2', text: 'The tech company Apple is known for its innovative products like the iPhone.' },
    { id: 'vec3', text: 'Many people enjoy eating apples as a healthy snack.' },
    { id: 'vec4', text: 'Apple Inc. has revolutionized the tech industry with its sleek designs and user-friendly interfaces.' },
    { id: 'vec5', text: 'An apple a day keeps the doctor away, as the saying goes.' },
    { id: 'vec6', text: 'Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne as a partnership.' }
];

// Convert the text into numerical vectors that Pinecone can index
const model = 'multilingual-e5-large';

const embeddings = await pc.inference.embed(
    model,
    data.map(d => d.text),
    { inputType: 'passage', truncate: 'END' }
);

// Prepare the records for upsert
// Each contains an 'id', the embedding 'values', and the original text as 'metadata'
const records = data.map((d, i) => ({
    id: d.id,
    values: embeddings[i].values,
    metadata: { text: d.text }
}));

// Upsert the vectors into the index
await index.namespace('20250129-example-namespace').upsert(records);