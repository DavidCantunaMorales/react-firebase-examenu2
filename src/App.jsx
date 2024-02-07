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
      path: '/',
      element: <SignIn />,
    },
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
