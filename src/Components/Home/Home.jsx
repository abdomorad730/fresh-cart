import React from 'react'
import style from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
import { installApp } from "../../main";

export default function Home() {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>

<button className="inline-flex items-center justify-center rounded-xl bg-green-600 text-white px-6 py-3 font-bold text-lg hover:bg-green-700 shadow"onClick={installApp}>📲 تثبيت التطبيق</button>
      <MainSlider/>
      <CategorySlider/>
      <FeatureProducts/>
    </div>
  )
}
