import React, { useEffect, useState } from 'react'
import './index.scss'
import Header from '@shared/Header/'
import Sidebar from './Sidebar'
import RightSections from './RightSections/'
import history from '@history'
import { useStore } from '@store'
import { setUserFullDetailsAction } from '@actions'
import { callGetUserFullGetails } from '@api/requestType'

const Home = () => {
  const { dispatch } = useStore()
  const getUserInfo = async () => {
    const { pathname: username } = history.location
    if (username) {
      const { status, data } = await callGetUserFullGetails({ username })
      if (status === 200) {
        dispatch(setUserFullDetailsAction(data))
      }
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <Header />
      <div className="Wrapper">
        <Sidebar />
        <RightSections />
      </div>
    </>
  )
}

export default Home
