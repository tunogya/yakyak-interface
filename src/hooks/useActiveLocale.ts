import { atom ,useRecoilState } from "recoil";
import {SUPPORTED_LOCALES} from "../constants/locales";

const localeAtom = atom({
  key: "locale",
  default: SUPPORTED_LOCALES[0],
})

export function useActiveLocale(){
  const [locale, setLocale] = useRecoilState(localeAtom)

  const toggle = () => {
    if (locale === "en-US"){
    }
    console.log(locale)
  }

  return {
    locale,
    toggle
  }
}
