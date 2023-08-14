import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  About,
  HomeLayout,
  Landing,
  Error,
  Cocktail,
  Newsletter,
  SinglePageError,
} from './pages'

import { loader as loaderLanding } from './pages/Landing'
import { loader as singleCocktailLoader } from './pages/Cocktail'
import { action as newletterAction } from './pages/Newsletter'

const clietnQuery = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: loaderLanding(clietnQuery),
        errorElement: <SinglePageError />,
        element: <Landing />,
      },
      { path: 'about', element: <About /> },
      { path: 'newsletter', element: <Newsletter />, action: newletterAction },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        element: <Cocktail />,
        loader: singleCocktailLoader(clietnQuery),
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={clietnQuery}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
