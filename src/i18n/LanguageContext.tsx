import { createContext, useContext, type ReactNode } from 'react'

export type Lang = 'en' | 'fi'

const LanguageContext = createContext<Lang>('en')

export const LanguageProvider = ({ lang, children }: { lang: Lang; children: ReactNode }) => (
  <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
)

export const useLang = () => useContext(LanguageContext)

export const homePath = (lang: Lang) => (lang === 'fi' ? '/fi' : '/')
export const hashPath = (lang: Lang, hash: string) => `${lang === 'fi' ? '/fi' : ''}#${hash}`
export const portfolioPath = (lang: Lang, slug: string) => `${lang === 'fi' ? '/fi' : ''}/portfolio/${slug}`
export const servicePath = (lang: Lang, slug: string) => `${lang === 'fi' ? '/fi' : ''}/services/${slug}`

// Builds the equivalent URL in the other language, preserving the current path, query and hash.
export const switchLangPath = (pathname: string, search: string, hash: string, targetLang: Lang) => {
  const isFi = pathname === '/fi' || pathname.startsWith('/fi/')
  const rest = isFi ? pathname.slice(3) || '/' : pathname
  const newPath = targetLang === 'fi' ? (rest === '/' ? '/fi' : `/fi${rest}`) : rest
  return `${newPath}${search}${hash}`
}
