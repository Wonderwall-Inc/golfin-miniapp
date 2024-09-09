import React, { useEffect } from 'react'
import Title from '../components/TitleComponent/Title'
import { Page } from 'konsta/react'
import { socialMediaLinks } from '../constants'
import { initUtils } from '@telegram-apps/sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';


const Links = () => {
  const utils = initUtils();
  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname == '/') {
      WebApp.BackButton.hide()
    } else {
      WebApp.BackButton.show()
    }
  }, [location])


  const navigateToHome = () => {
    navigate('/');
  };

  WebApp.BackButton.onClick(navigateToHome)

  return (
    <div className='home-screen-slogan-container'>
      <Page>
        <div className='mt-[100px]'>
          <Title titlename='LINKS' />
          <div className='mt-10'>
            {socialMediaLinks.map((socialMedia, index) => {
              return (
                <div
                  key={index}
                  className={`${index == 0 ?
                    `justify-center items-center text-start cursor-pointer pt-5` :
                    `text-start justify-center items-center cursor-pointer`} `}
                  onClick={() => { utils.openLink(socialMedia.url, { tryInstantView: true }) }}>
                  <div className='flex flex-row justify-center'>
                    <div className='scale-140 mb-15 mx-7'> {socialMedia.icon}</div>
                    <div className='mx-4 my-1 font-[700] tracking-wider w-[200px] text-white leading-tight text-2xl'>
                      <div className='leading-2'>{socialMedia.cto}</div>
                    </div>
                  </div>
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