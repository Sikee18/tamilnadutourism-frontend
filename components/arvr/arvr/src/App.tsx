import VirtualAerialTour from './VirtualAerialTour'
import { ErrorBoundary } from './ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <VirtualAerialTour />
    </ErrorBoundary>
  )
}

export default App
