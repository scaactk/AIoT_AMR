// pages/api/identify.js

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle file upload manually
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // NOTE: File upload parsing intentionally omitted (image content not yet analyzed).
  // Frontend can still send multipart/form-data; here we just drain the stream.
  // Minimal drain to avoid hanging when a file is sent.
  await new Promise(resolve => {
    req.on('data', () => {});
    req.on('end', resolve);
  });

  // Updated requirement: total 7 wells including NC as first element.
  // Pattern provided (including NC): p, n, p, n, n, p, p
  const campy = ['positive','negative','positive','negative','negative','positive','positive'];
  const salmonella = ['positive','negative','positive','negative','negative','positive','positive'];

  function summarize(arr){
    const positive = arr.filter(v=>v==='positive').length;
    const negative = arr.length - positive;
    return { total: arr.length, positive, negative };
  }

  const response = {
    campy,
    salmonella,
    summary: {
      campy: summarize(campy),
      salmonella: summarize(salmonella)
    },
    metadata: {
      receivedAt: new Date().toISOString(),
      processingMs: 0,
      note: 'Static classification 7 wells including NC.'
    }
  };

  res.status(200).json(response);
}