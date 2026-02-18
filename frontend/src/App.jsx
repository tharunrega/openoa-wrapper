import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const runAnalysis = async () => {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      // Use environment variable for API URL or fallback to localhost
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/analyze/aep`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Analysis failed')
      }
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>OpenOA Dashboard</h1>
      <div className="card">
        <h2>Annual Energy Production (AEP) Analysis</h2>
        <p>Run a demo analysis using the "La Haute Borne" wind farm data.</p>

        <button onClick={runAnalysis} disabled={loading}>
          {loading ? 'Running Analysis...' : 'Run Analysis'}
        </button>

        {error && <div className="error">{error}</div>}

        {results && (
          <div className="results">
            <h3>Results</h3>
            <p className="success-message">{results.message}</p>
            <ul>
              <li><strong>AEP:</strong> {results.results.aep_GWh} GWh</li>
              <li><strong>Uncertainty:</strong> {results.results.uncertainty_percent}%</li>
              <li><strong>Availability Loss:</strong> {results.results.availability_GWh} GWh</li>
              <li><strong>Curtailment Loss:</strong> {results.results.curtailment_GWh} GWh</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
