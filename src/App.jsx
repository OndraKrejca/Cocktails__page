import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  About,
  HomeLayout,
  Landing,
  Error,
  Cocktail,
  Newsletter,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'about', element: <About /> },
      { path: 'newsletter', element: <Newsletter /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
