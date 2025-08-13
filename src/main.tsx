import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import store from './components/store/store.ts'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './components/store/reducers/index.ts'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
