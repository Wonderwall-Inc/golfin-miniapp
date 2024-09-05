import Title from '../components/TitleComponent/Title'
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from 'konsta/react'
import React, { useState } from 'react';
import {
  Page,
  Navbar,
  Tabbar,
  TabbarLink,
  Block,
  Icon,
  List,
  ListItem,
  Toggle
} from 'konsta/react';
import { MdEmail, MdToday, MdFileUpload } from 'react-icons/md';

const Ranking = () => {
  const [activeTab, setActiveTab] = useState('tab-1');
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const [isTabbarIcons, setIsTabbarIcons] = useState(false);
  const rankingStyle = {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    marginLeft: '90px',
  }
  return (
    <div className='home-screen-slogan-container h-[630px]'>
      <Title titlename='Ranking' style={rankingStyle} />

      <div className='w-[393px] h-[250px] text-black py-[32px] px-[16px] gap-[48px] mt-[30px]'>
        <div className='rounded-full  border-2 border-black w-[149px] h-[149px] m-auto py-[10px] content-center'>

          <div className='text-center items-center content-center'>
            <div className='font-bold text-[34px] leading-[41px] text-center content-center item-center tracking-[0.4px]'>1</div>
            <div className='font-[600] text-[22px] leading-[28px] text-center content-center item-center tracking-[-0.26px]'>points</div>
          </div>
        </div>
      </div>
      <Page className='bg-black w-300px h-[700px]'>


        <Tabbar
          labels={isTabbarLabels}
          icons={isTabbarIcons}
        >
          <TabbarLink
            active={activeTab === 'tab-1'}
            onClick={() => setActiveTab('tab-1')}
            label={isTabbarLabels && 'Tab 1'}
          />
          <TabbarLink
            active={activeTab === 'tab-2'}
            onClick={() => setActiveTab('tab-2')}
            label={isTabbarLabels && 'Tab 2'}
          />
          <TabbarLink
            active={activeTab === 'tab-3'}
            onClick={() => setActiveTab('tab-3')}
            label={isTabbarLabels && 'Tab 3'}
          />
        </Tabbar>



        {activeTab === 'tab-1' && (
          <Block strong inset className="space-y-4">
            tab1
          </Block>
        )}

        {activeTab === 'tab-2' && (
          <Block strong inset className="space-y-4">
            tab2
          </Block>
        )}

        {activeTab === 'tab-3' && (
          <Block strong inset className="space-y-4">
            tab3
          </Block>
        )}
      </Page>
    </div>

  )
}

export default Ranking