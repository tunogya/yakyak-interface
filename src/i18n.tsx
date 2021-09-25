import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import {ReactNode, useEffect, useState} from 'react'
import { SupportedLocale } from './constants/locales'
import { detect, fromUrl, fromStorage, fromNavigator } from '@lingui/detect-locale'

import {
  en,
  zh,
  PluralCategory,
} from 'make-plural/plurals'

type LocalePlural = {
  [key in SupportedLocale]: (n: number | string, ord?: boolean) => PluralCategory
}

const plurals: LocalePlural = {
  'en-US': en,
  'zh-CN': zh,
}

async function dynamicActivate(locale: SupportedLocale) {
  const { messages } = await import(`@lingui/loader!./locales/${locale}.po`)
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] })
  i18n.load(locale, messages)
  i18n.activate(locale)

  if (window.localStorage) {
    window.localStorage.setItem('lang', locale)
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = 'en-US'
  // 使用钩子函数
  // const locale = useActiveLocale()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dynamicActivate(locale)
      .then(() => {
        document.documentElement.setAttribute('lang', locale)
        setLoaded(true)
      })
      .catch((error) => {
        console.error('Failed to activate locale', locale, error)
      })
  }, [locale])

  // prevent the app from rendering with placeholder text before the locale is loaded
  if (!loaded) return null

  return (
    <I18nProvider forceRenderOnLocaleChange={false} i18n={i18n}>
      {children}
    </I18nProvider>
  )
}

