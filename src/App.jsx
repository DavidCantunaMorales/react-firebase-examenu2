/*
import './App.css';
import { SignIn } from './Routes/SignIn';
import { SignUp } from './Routes/SignUp';
import { Home } from './Routes/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { Protected } from './Routes/Protected';
import { Edit } from './Routes/Edit';
import { Create } from './Routes/Create';

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: '/home',
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/edit/:id',
      element: (
        <Protected>
          <Edit />
        </Protected>
      ),
    },
    {
      path: '/create',
      element: (
        <Protected>
          <Create />
        </Protected>
      ),
    },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
*/

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SignIn } from './Routes/SignIn';
import { SignUp } from './Routes/SignUp';
import { Home } from './Routes/Home';
import { Protected } from './Routes/Protected';
import { Edit } from './Routes/Edit';
import { Create } from './Routes/Create';
import { AuthContext } from './Context/AuthContext';

function App() {
  return (
    <AuthContext>
      <Router>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Protected>
          <Route path={['/', '/home']} element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Protected>
      </Router>
    </AuthContext>
  );
}

export default App;
