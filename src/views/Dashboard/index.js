import React, { useEffect } from 'react'
import { useStore } from '@store'
import { callGetUsersList } from '@api/requestType'
import { setUsersListAction } from '@actions'
import Header from '@shared/Header'
import { DEFAULT_PROFILE_URL } from '@constants'
import './index.scss'

const Dashboard = () => {
  const {
    state: { usersList = [] },
    dispatch,
  } = useStore()
  const getUsersList = async () => {
    const { status, data } = await callGetUsersList()
    if (status === 200) {
      dispatch(setUsersListAction(data))
    }
  }

  useEffect(() => {
    getUsersList()
  }, [])

  return (
    <div>
      <Header />
      <div className="Container">
        <div className="Row">
          {usersList &&
            usersList.map((item, i) => (
              <div className="Col Col3" key={item.username}>
                <a href={item.username} target="_blank" className="LinkNone">
                  <div className="Box ProfileView">
                    <img
                      src={
                        (item.userPhoto && item.userPhoto.imgUrl) ||
                        DEFAULT_PROFILE_URL
                      }
                    />
                    <div>
                      <h3 className="Title">{item.name}</h3>
                      <p>{item.designation}</p>
                      <p>{item.address}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
