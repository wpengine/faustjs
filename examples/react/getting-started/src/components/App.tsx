import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Post from '../pages/post';
import Category from '../pages/category';
import Page from '../pages/page';
import Home from '../pages/home';
import styles from '../styles/App.module.css';
import Header from '../components/Header';
import client from '../lib/client';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />

        <div className="App">
          <Switch>
            <Route path={`/posts/:postSlug`}>
              <Post />
            </Route>
            <Route path={`/category/:categorySlug`}>
              <Category />
            </Route>
            <Route path={`/:pageSlug`}>
              <Page />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
