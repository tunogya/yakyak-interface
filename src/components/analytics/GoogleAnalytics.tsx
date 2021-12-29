import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import ReactGA from "react-ga";

export const GoogleAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.pageview(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return null
}