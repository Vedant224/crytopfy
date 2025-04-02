import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {


    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input,setInput] =useState('');

    const inputHandler=(event)=>{
        setInput(event.target.value);
        if(event.target.value === ""){
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler = async (event)=>{
        event.preventDefault();
        const coins = await allCoin.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)
    }

    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin])

    return (
        <div className='text-white my-10 p-4'>
            <div className="flex justify-center pt-0  py-[10px] pb-[50px]">
                <div className="max-w-[600px] mx-[80px] my-auto flex flex-col items-center text-center gap-7">
                    <h1 className='font-bold text-4xl'>Largest <br /> Crypto Marketplace</h1>
                    <p className='w-[75%] text-white leading-relaxed'>Welcome to Cryptofy a cryptocurrency marketplcae.Sign up to explore more about crypto.</p>
                    <form onSubmit={searchHandler} className='p-2 md:w-[80%] text-black bg-white rounded-sm text-xl flex justify-between items-center gap-[10px]'>
                        <input onChange={inputHandler} list='coinlist' className='flex-1 text-lg border-none outline-0 pl-2' type='text' value={input} placeholder='Search crypto..' required/>

                        <datalist id='coinlist'>
                            {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
                        </datalist>

                        <button className='border-none cursor-pointer' type='submit'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="20px" viewBox="0 0 26 26">
                            <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z"></path>
                        </svg></button>
                    </form>
                </div>
            </div>
            <div className="max-w-[800px] bg-gradient-to-b from-[rgb(13,20,33)] via-[#222531] to-[#222531] m-auto rounded-2xl">
                <div className="px-3 py-5 grid md:grid-cols-[0.5fr_3fr_1fr_1fr_1.5fr] items-center border-b-2 border-[#3c3c3c] rounder-2xl grid-cols-[0.5fr_3fr_1fr_1fr]">
                    <p>#</p>
                    <p>Coin</p>
                    <p>Price</p>
                    <p className='text-center'>24H Change</p>
                    <p className='text-right md:block hidden'>Market cap</p>
                </div>
                <div>
                    {
                        displayCoin.slice(0, 10).map((item, index) => (
                            <Link to={`/coin/${item.id}`} className="px-3 py-5 grid md:grid-cols-[0.5fr_3fr_1fr_1fr_1.5fr] items-center border-b-2 border-[#3c3c3c] rounder-2xl last:border-0 grid-cols-[0.5fr_3fr_1fr_1fr]" key={index}>
                                <p>{item.market_cap_rank}</p>
                                <div className='flex items-center gap-2 '>
                                    <img width="35px" src={item.image} alt="" />
                                    <p>{item.name + "-" + item.symbol}</p>
                                </div>
                                <p>{currency.symbol} {item.current_price}</p>
                                <p
                                    className={item.price_change_percentage_24h >= 0
                                            ? "text-green-500 text-center"
                                            : "text-red-500 text-center"
                                    }
                                >
                                    {item.price_change_percentage_24h > 0 ? "+" : ""}
                                    {item.price_change_percentage_24h.toFixed(2)}%
                                </p>
                                <p className="right-0 md:flex md:justify-end hidden">{currency.symbol} {item.market_cap.toLocaleString()}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
