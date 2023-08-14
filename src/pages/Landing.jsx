import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { SearchForm, CocktailList } from '../components'
import { useQuery } from '@tanstack/react-query'

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const isQueryContent = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const resp = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
      return resp.data.drinks
    },
  }
}

export const loader =
  (clietnQuery) =>
  async ({ request }) => {
    const url = new URL(request.url)
    const searchTerm = url.searchParams.get('search') || ''
    await clietnQuery.ensureQueryData(isQueryContent(searchTerm))
    return { searchTerm }
  }

const Landing = () => {
  const { searchTerm } = useLoaderData()
  const { data: drinks } = useQuery(isQueryContent(searchTerm))

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  )
}

export default Landing
