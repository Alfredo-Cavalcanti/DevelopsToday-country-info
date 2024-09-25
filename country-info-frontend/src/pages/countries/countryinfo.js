import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BorderCountries from "../../components/BorderCountries";
import PopulationChart from "../../components/PopulationChart";

const CountryInfo = () => {
    const { code } = useParams();
    const [countryData, setCountryData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/countries/${code}`)
            .then((response) => response.json())
            .then((data) => setCountryData(data))
            .catch((error) =>
                console.error("Error fetching country data:", error)
            );
    }, [code]);

    if (!countryData) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link
                to="/"
                className="text-2xl text-blue-500 hover:underline mr-4"
            >
                Back to Country List
            </Link>
            <h1 className="text-5xl font-bold text-center mb-4">
                {countryData.borderCountries.commonName}
            </h1>
            <div className="flex flex-col items-center mb-6">
                <img
                    className="w-full h-auto max-w-lg rounded-lg shadow-lg"
                    src={countryData.flagUrl}
                    alt={`${countryData.borderCountries.commonName} flag`}
                />
            </div>
            <div className="bg-white rounded-lg p-6">
                <BorderCountries
                    borderCountries={countryData.borderCountries.borders}
                />
                <PopulationChart populationData={countryData.populationData} />
            </div>
        </div>
    );
};

export default CountryInfo;
