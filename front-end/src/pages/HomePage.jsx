import React, { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'
import {server} from '../api/axios'
import axios from 'axios'
import { apiKey, urlTrack } from '../api/config'
import SingleTrackComponent from '../components/SingleTrackComponent'
import HomepageComponent from '../components/HomepageComponent'

export default function HomePage() {

  return (
    <HomepageComponent/>
  )
}
