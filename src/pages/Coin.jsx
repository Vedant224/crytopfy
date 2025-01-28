import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext'
import LineChart from '../components/LineChart';

const Coin = () => {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchHistoricalData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  const fetchCoinData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if (coinData && historicalData) {

    return (
      <div className='text-white'>
        <div className="flex flex-col items-center gap-5 my-8 mx-auto mb-12">
          <img className='max-w-25' src={coinData.image.large} alt="" />
          <p><b className='text-4xl font-medium'>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>

        </div>
        <div className="w-full max-w-150 mx-auto">
          <LineChart historicalData={historicalData}/>
        </div>


        <div className="max-w-150 mx-auto mt-5 mb-15 flex flex-col">
          <ul className='flex justify-between py-3 px-0 border-b-1 border-[#5f5d5f] '>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul className='flex justify-between py-3 px-0 border-b-1 border-[#5f5d5f] '>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between py-3 px-0 border-b-1 border-[#5f5d5f] '>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between py-3 px-0 border-b-1 border-[#5f5d5f] '>
            <li>24 Hour high</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between py-3 px-0 border-b-1 border-[#5f5d5f] '>
            <li>24 Hour low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>

        </div>

      </div>
    )
  }
  else {
    return (
      <div className='text-white grid self-center justify-center min-h-[80vh]'>
        <div className="h-[45px] w-[45px] self-center border-5 border-[#bdbdbd] border-t-[#0D1421] rounded-[50%] animate-spin duration-2000">

        </div>

      </div>
    )
  }

}

export default Coin
