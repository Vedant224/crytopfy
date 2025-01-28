import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData }) => {

    const [data, setData] = useState([["Dates", "Prices"]])

    useEffect(() => {
        let dataCopy = [["Dates", "Prices"]];
        if (historicalData.prices) {
            historicalData.prices.forEach((item) => {
                if (item[0] && item[1] != null) {
                    const date = new Date(item[0]);
                    const formattedDate = date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
                    dataCopy.push([formattedDate, Number(item[1])]);
                }
            });

            setData(dataCopy)
        }
    }, [historicalData])


    return (
        <Chart chartType='LineChart' data={data} height="100%" legendToggle />
    )
}

export default LineChart
