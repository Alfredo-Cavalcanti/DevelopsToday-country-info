import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PopulationChart = ({ populationData }) => {
    const data = {
        labels: populationData.map((item) => item.year),
        datasets: [
            {
                label: "Population",
                data: populationData.map((item) => item.value),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                Population over time
            </h2>
            <Line data={data} />
        </div>
    );
};

export default PopulationChart;
