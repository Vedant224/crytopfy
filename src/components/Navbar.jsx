import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currencyHandler = (event) => {
        switch (event.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" });
                break;
            }
            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            }
            default: {
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            }
        }
    };

    return (
        <div className="flex flex-row justify-between items-center border-b-2 border-[rgb(50,53,70)] h-20 p-4 box-border">
            <div className="flex items-center gap-3">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>

                </button>

                <Link to={'/'} >
                    <img src={logo} className="h-14" alt="Logo" />
                </Link>
            </div>
            <div className="hidden md:flex">
                <ul className="flex flex-row text-white gap-8 text-[17px] font-medium cursor-pointer">
                    <Link to={'/'}><li className="hover:text-gray-200">Home</li></Link>
                    <li className="hover:text-gray-200">Features</li>
                    <li className="hover:text-gray-200">Pricing</li>
                    <li className="hover:text-gray-200">Blog</li>
                </ul>
            </div>
            <div className="flex items-center gap-3">
                <select className="rounded bg-transparent text-white border-[2px] p-2 hidden md:block"
                    onChange={currencyHandler}>
                    <option className="bg-[#0d1421]" value="usd">USD</option>
                    <option className="bg-[#0d1421]" value="eur">EUR</option>
                    <option className="bg-[#0d1421]" value="inr">INR</option>
                </select>
                <div className="flex items-center gap-3 md:hidden">
                    <select className="rounded bg-transparent text-white border-[2px] p-2"
                        onChange={currencyHandler}>
                        <option className="bg-[#0d1421]" value="usd">USD</option>
                        <option className="bg-[#0d1421]" value="eur">EUR</option>
                        <option className="bg-[#0d1421]" value="inr">INR</option>
                    </select>


                </div>

                <button className="hidden md:flex px-4 py-2 bg-white text-[#0D1421] rounded items-center space-x-2">
                    <span>Sign Up</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6l6 6-6 6" />
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-20 right-0 w-full bg-[#0D1421] p-4 pl-8 md:hidden">
                    <ul className="flex flex-col text-white gap-4 text-[17px] font-medium cursor-pointer">
                        <li className="hover:text-gray-200">Home</li>
                        <li className="hover:text-gray-200">Features</li>
                        <li className="hover:text-gray-200">Pricing</li>
                        <li className="hover:text-gray-200">Blog</li>
                    </ul>
                    <button className="mt-4 w-full px-4 py-2 bg-white text-[#0D1421] rounded flex items-center justify-center space-x-2">
                        <span>Sign Up</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
