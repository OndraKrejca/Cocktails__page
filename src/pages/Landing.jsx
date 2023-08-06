import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { SearchForm, CocktailList } from '../components'

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

export const loader = async ({ request }) => {
  const url = new URL(request.url)

  const searchTerm = url.searchParams.get('search') || ''
  const resp = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
  return { drinks: resp.data.drinks, searchTerm }
}

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData()

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  )
}

export default Landing
