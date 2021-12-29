import { useEffect } from 'react'
import ReactGA from 'react-ga'
import {useLocation} from "react-router-dom";

// fires a GA pageview every time the route changes
export default function GoogleAnalyticsReporter(): null {
  const location = useLocation()

  useEffect(() => {
    ReactGA.pageview(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])
  return null
}
