import React from 'react'
import './SplashScreen.css'

const SplashScreen = () => {
  return (
    <div className='home-screen-slogan-container'>
      <div className='home-screen-slogan'>
        <div className='home-screen-slogan-golfin'>GOLFIN</div>
        <div className='home-screen-slogan-web3'>Web3</div>
      </div>

      <div className='home-screen-container'>
        <div className='home-screen-container-illustration'>Illustration</div>
        <div className='home-screen-container-loader'>Loader</div>
      </div>
    </div>
  )
}

export default SplashScreen