import React from 'react'
import './Home.css'
import Title from '../../components/TitleComponent/Title'
import { Block, Page } from 'konsta/react'

const Home = () => {

  return (
    <div className='home-screen-slogan-container'>
      <Page>
        <div className='mt-[100px]'>
          <Title titlename='EARN' />

          <Block>

            <div className='mt-20'>
              5200 points
            </div>
          </Block>
        </div >
      </Page >

    </div >
  )
}

export default Home