import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { server } from '../api/axios'
import FollowersComponent from '../components/follows/FollowersComponent'
import FollowingsComponent from '../components/follows/FollowingsComponent'
import useAuthContext from '../context/AuthContext'
import FollowsComponent from '../components/follows/FollowsComponent'

export default function FollowsPage() {
    
  return (
   <FollowsComponent/>
  )
}
