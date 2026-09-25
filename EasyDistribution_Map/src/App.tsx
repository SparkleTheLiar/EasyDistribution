import type { JSX } from 'react'
import { Sidebar } from './features/sidebar/components/Sidebar'
import './App.css'

interface AppProps {
  serviceName?: string
}

function App(props: AppProps): JSX.Element {
  const serviceName = props.serviceName ?? 'EasyDistribution'

  return (
    <div className="app-shell" id="home">
      <Sidebar />
      <main className="home-page" aria-label="Pagina principală EasyDistribution">
        <h1 className="home-page__title">{serviceName}</h1>
      </main>
    </div>
  )
}

export default App
