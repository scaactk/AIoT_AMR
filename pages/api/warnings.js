import connectDB from '../../lib/mongodb';
import Warning from '../../models/Warning';
import mongoose from 'mongoose'; // Import mongoose to access connection properties
import { MongoClient } from 'mongodb'; // Import MongoClient from official driver

const uri = 'mongodb://localhost:27017'; // Connection URI for native driver
const client = new MongoClient(uri);
const dbName = 'amr_monitor';

export default async function handler(req, res) {
  console.log('--- Mongoose Connection Info ---');
  console.log('Connecting to DB via Mongoose...');
  await connectDB(); // Use Mongoose cached connection
  console.log('DB Connected via Mongoose!');
  console.log('Actual Connected to database (Mongoose):', mongoose.connection.name);
  console.log('Actual Connected to host (Mongoose):', mongoose.connection.host);
  console.log('Actual Connected to port (Mongoose):', mongoose.connection.port);

  console.log('\n--- MongoDB Native Driver Info ---');
  try {
    console.log('Connecting to DB via Native Driver...');
    await client.connect();
    console.log('DB Connected via Native Driver!');
    const db = client.db(dbName);
    const collection = db.collection('warnings');
    console.log('Querying collection:', collection.collectionName);
    const nativeWarnings = await collection.find({}).toArray();
    console.log('Fetched warnings (Native Driver):', nativeWarnings.length, nativeWarnings);
  } catch (e) {
    console.error('Error connecting or querying with Native Driver:', e);
  } finally {
    // Native driver client should be closed if not using persistent connection
    // await client.close(); // Closing client here might affect performance in serverless, but good for debugging
  }
  console.log('----------------------------------');

  switch (req.method) {
    case 'GET':
      console.log('Handling GET request for warnings (Mongoose Query)');
      try {
        console.log('Warning Model available:', !!Warning); // Check if Model is truthy
        console.log('Fetching warnings from DB via Mongoose...');
        const warnings = await Warning.find({}).sort({ time: -1 });
        console.log('Fetched warnings (Mongoose):', warnings.length, warnings); // Log count and data
        res.status(200).json(warnings);
      } catch (error) {
        console.error('Error fetching warnings via Mongoose:', error);
        res.status(500).json({ error: 'Failed to fetch warnings' });
      }
      break;

    case 'POST':
      console.log('Handling POST request for warnings');
      try {
        const warning = await Warning.create(req.body);
        console.log('Created warning:', warning);
        res.status(201).json(warning);
      } catch (error) {
        console.error('Error creating warning:', error);
        res.status(500).json({ error: 'Failed to create warning' });
      }
      break;

    case 'PUT':
      console.log('Handling PUT request for warnings');
      try {
        const { id, ...updateData } = req.body;
        console.log('Updating warning with ID:', id);
        const warning = await Warning.findByIdAndUpdate(
          id,
          { ...updateData, updatedAt: Date.now() },
          { new: true }
        );
        console.log('Updated warning:', warning);
        res.status(200).json(warning);
      } catch (error) {
        console.error('Error updating warning:', error);
        res.status(500).json({ error: 'Failed to update warning' });
      }
      break;

    case 'DELETE':
      console.log('Handling DELETE request for warnings');
      try {
        const { id } = req.body;
        console.log('Deleting warning with ID:', id);
        await Warning.findByIdAndDelete(id);
        console.log('Warning deleted.');
        res.status(200).json({ message: 'Warning deleted successfully' });
      } catch (error) {
        console.error('Error deleting warning:', error);
        res.status(500).json({ error: 'Failed to delete warning' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 