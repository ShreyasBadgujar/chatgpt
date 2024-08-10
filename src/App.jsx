import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = "AIzaSyDznSrpkIafXf7-czR6UlQKyID4_M9n0Qw"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const generateResponse = async () => {
    setLoading(true);
    setResponse('');
    setError('');

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      setResponse(result.response.text());
    } catch (error) {
      console.error('Error generating response:', error);
      setError('An error occurred while generating the response. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Generate Your Response
      </h1>

      <textarea
        id="prompt"
        rows="5"
        style={{ width: '100%', maxWidth: '600px', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #333333', backgroundColor: '#1e1e1e', color: '#ffffff', resize: 'none' }}
        placeholder="Type your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <button
        style={{ padding: '12px 24px', backgroundColor: '#6200ea', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.3s' }}
        onClick={generateResponse}
        disabled={!prompt || loading}
      >
        {loading ? 'Generating...' : 'Generate Response'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px', padding: '10px', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#ffffff', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#333333', height: '8px', borderRadius: '4px', marginBottom: '10px', width: '80%', margin: '0 auto' }}></div>
          <div style={{ backgroundColor: '#333333', height: '8px', borderRadius: '4px', marginBottom: '10px', width: '60%', margin: '0 auto' }}></div>
          <div style={{ backgroundColor: '#333333', height: '8px', borderRadius: '4px', marginBottom: '10px', width: '70%', margin: '0 auto' }}></div>
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px', padding: '20px', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>Response:</h4>
          <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{response}</p>
        </div>
      )}

      {error && <p style={{ marginTop: '20px', color: '#ff4444' }}>{error}</p>}
    </div>
  );
};

export default App;
