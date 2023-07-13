import React from "react";
// this part can be moved to a json, csv or database
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

const light: string[] = [
    "Full Sun",
    "Full Sun",
    "Full Sun or Partial Shade",
    "Full Sun and Shade in Summer",
    "Full Sun",
    "Full Sun", 
    "Bright, Indirect Light",
    "Full Sun",
    "Full Sun", 
    "Full Sun"
];

const height: string[] = [
    "1 to 6 Feet",
    "3 to 4 Feet",
    "2 to 3 Feet",
    "1 to 3 Feet",
    "3 to 4 Feet",
    "1/2 to 2 Feet",
    "1 to 3 Feet",
    "2 to 3 Feet",
    "3 to 4 Feet", 
    "~6 Feet"
];

const continuation: string[] = [
    "Perennial",
    "Perennial",
    "Perennial",
    "Perennial",
    "Perennial",
    "Annual",
    "Perennial",
    "Annual",
    "Perennial",
    "Annual"
];

interface infoCardProps {
    index: number;
  };

const InfoCard: React.FC<infoCardProps> = (props: infoCardProps) => {
    return (
        <section className="grid grid-cols-2 mt-3">
          <div className="bg-pink-700 p-3 rounded shadow">
            <h2 className="text-xl text-white font-bold my-2 text-center">{classes[props.index]}</h2>
            {/* <p className="text-lg">{(prediction.percentage * 100).toFixed(2)}%</p> */}
         </div>

            <div className="bg-[#f7c3d4] text-black px-2">
                <p className="text-center">
                    {continuation[props.index]}
                </p>
                <p className="text-center">
                    Light: {light[props.index]}
                </p>
                <p className="text-center">
                    Height- {height[props.index]}
                </p>
            </div>
        </section>

    );
};

export default InfoCard;
