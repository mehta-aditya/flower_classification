"use client"
import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";

interface Prediction {
  class: string;
  percentage: number;
}

const fileTypes = ["JPG", "PNG", "JPEG", "HEIC"];

interface imageHandlerProps {
  modelPath: string;
  classes: string[];
};

const ImageHandler: React.FC<imageHandlerProps> = (props: imageHandlerProps) => {
  const [imageURL, setImageURL] = useState("");
  const [networkPrediction, setNetworkPrediction] = useState<Prediction[]>([]);

  const handleChange = (file: File) => {
    setImageURL(URL.createObjectURL(file));
    setNetworkPrediction([]);
  };

  const runModel = async () => {
    if (!tf.getBackend()) {
      await tf.ready();
    }

    const model = await tf.loadLayersModel(props.modelPath);

    const img = document.getElementById("previewImage") as HTMLImageElement;
    if (img && model) {
      let input = tf.browser.fromPixels(img);
      input = tf.image.resizeBilinear(input, [128, 128]);

      const predictions = model.predict(input.reshape([1, 128, 128, 3])) as tf.Tensor;
      const results = await predictions.array() as number[][];
      console.log(results);
      const sortedResults: Prediction[] = results[0]
        .map((result, index) => ({ class: props.classes[index], percentage: result }))
        .sort((a, b) => b.percentage - a.percentage);

      setNetworkPrediction(sortedResults.slice(0,1));
    }
  };

  return (
    <>
    {!imageURL && (
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
    )}

    <div className="flex flex-col items-center py-12">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        maxSize={4}
        className="mb-6"
      />

      {imageURL && (
        <div className="relative w-80 h-80 mb-6">
          <Image src={imageURL} alt="image" fill={true} id="previewImage" className="object-cover rounded"/>
        </div>
      )}


      <button
        className="bg-pink-500 hover:bg-pink-700 text-white text-xl font-bold py-2 px-4 rounded"
        onClick={runModel}
      >
      🌼 Classify Image 🌼
      </button>

      {networkPrediction.length > 0 && (

        <div className="bg-pink-700 p-3 rounded shadow mt-3">
          <h2 className="text-xl text-white font-bold mb-2">{networkPrediction[0].class}</h2>
          {/* <p className="text-lg">{(prediction.percentage * 100).toFixed(2)}%</p> */}
        </div>


      )}
    </div>
    </>
  );
};

export default ImageHandler;
