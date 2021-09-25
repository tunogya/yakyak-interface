export const SUPPORTED_LOCALES = [
  // order as they appear in the language dropdown
  'en-US',
  'zh-CN',
] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: SupportedLocale = 'zh-CN'

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-US': 'English',
  'zh-CN': '简体中文',
}
