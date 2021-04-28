import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';

import Home from '../pages/Home';
import AddTodo from '../pages/AddTodo';
import UpdateTodo from '../pages/UpdateTodo';
import UpdateUserAvatar from '../pages/UpdateUserAvatar';

const HomeRoutes = () => {
  return (
    <>
      <Header />

      <div>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/addTodo' component={AddTodo} />
          <Route exact path='/updateTodo/:todoId' component={UpdateTodo} />
          <Route
            exact
            path='/updateAvatar/:userId'
            component={UpdateUserAvatar}
          />
          <Redirect to='/home' />
        </Switch>
      </div>
    </>
  );
};

export default HomeRoutes;