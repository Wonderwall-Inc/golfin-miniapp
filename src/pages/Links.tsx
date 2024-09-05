import React from 'react'
import Title from '../components/TitleComponent/Title'
import { Page } from 'konsta/react'
import { socialMediaLinks } from '../constants'
import { initUtils } from '@telegram-apps/sdk';


const Links = () => {
  const utils = initUtils();
  return (
    <div className='home-screen-slogan-container h-[630px]'>
      <Page className='bg-white'>
        <div className='mt-[100px]'>

          <Title titlename='Links' />
          <div className='mt-20'>
            {socialMediaLinks.map((socialMedia, index) => {
              return (
                <div key={index} className='flex justify-center items-center flex-col cursor-pointer' onClick={() => {
                  utils.openLink(socialMedia.url,
                    { tryInstantView: true })
                }}>
                  <div className='p-1 scale-125 mb-7'>{socialMedia.icon}</div>
                  <div className='text-black mb-7 font-[600]'>{socialMedia.cto}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Page>

    </div >
  )
}

export default Links