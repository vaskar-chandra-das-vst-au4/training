import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Submit from './pages/Submit';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  { path: '/login', element: <Login /> },
  {
    path: '/onSubmit',
    element: (
      <Protected>
        <Submit />
      </Protected>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//@ Old routes
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Protected>
//                 <Home />
//               </Protected>
//             }
//           />

//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
