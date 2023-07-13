"use client"
import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import InfoCard from "./InfoCard";

interface Prediction {
  percentage: number;
  index: number;
}

const fileTypes = ["JPG", "PNG", "JPEG", "HEIC"];

interface imageHandlerProps {
  modelPath: string;
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
      const sortedResults: Prediction[] = results[0]
        .map((result, index) => ({ percentage: result, index:index }))
        .sort((a, b) => b.percentage - a.percentage);
      setNetworkPrediction(sortedResults.slice(0,1));
    }
  };

  return (
    <>
    <div className="flex flex-col items-center pt-6">
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
        <InfoCard index={networkPrediction[0].index}/>
      )}
    </div>
    </>
  );
};

export default ImageHandler;