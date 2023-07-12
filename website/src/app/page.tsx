import React, { useState, useEffect} from "react";
import ImageHandler from './ImageHandler';

const classes: string[] = [
  "Aster",
  "Daisy",
  "Iris",
  "Lavender",
  "Lily",
  "Marigold",
  "Orchid",
  "Poppy",
  "Rose",
  "Sunflower",
];

export default function Home() {
  return (
    <div>
      <h1 className="text-center font-bold text-5xl py-6 text-pink-800">Flower Classification</h1>
      <h2 className="text-center text-xl text-pink-500">Classify Up to 10 Types of Flowers!</h2>
      <h2 className="text-center text-xl text-pink-500">      
      Aster,
      Daisy,
      Iris,
      Lavender,
      Lily,
      Marigold,
      Orchid,
      Poppy,
      Rose,
      Sunflower
      </h2>
      <ImageHandler modelPath="/model/model.json" classes={classes}/>
    </div>
  )
}
