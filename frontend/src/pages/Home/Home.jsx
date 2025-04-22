import React, { useState } from 'react'
import './Home.css'
import Header from '../../component/Header/header'
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'
import AppDown from '../../component/AppDown/AppDown'

const Home = () => {
  const[category,setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu  category={category} setCategory={setCategory}/>
    <FoodDisplay category={category}/>
    <AppDown />
    </div>
  )
}

export default Home
