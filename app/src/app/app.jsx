import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'

import * as Components from '../components/components.jsx'
import { menuItems, NotFound } from '../pages/pages.jsx'

import './app.css'

let Content = withRouter(({ location, menuItems }) =>
  <Components.Page menuItems={menuItems}>
    <Switch location={location}>
      {
        menuItems
          .filter(item => !!item.component)
          .map((item) =>
            <Route key={item.url}
              exact={item.exact}
              path={item.url}
              component={item.component} />)
      }
      <Route component={NotFound} />
    </Switch>
  </Components.Page>)


const App = props => <div className="app">
  <Components.LeftBorder />
  <AppContainer>
    <BrowserRouter>
      <Content menuItems={menuItems} />
    </BrowserRouter>
  </AppContainer>
</div>

export default App
