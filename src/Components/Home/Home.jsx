import React from 'react'
import style from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <FeatureProducts/>
    </div>
  )
}
