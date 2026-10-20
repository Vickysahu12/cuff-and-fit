import { useEffect } from 'react'
import { site } from '../config/site'

/** Sets the tab title: "Page | Cuff & Fit", or the brand line on the home page. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | Style That Fits You`
  }, [title])
}
