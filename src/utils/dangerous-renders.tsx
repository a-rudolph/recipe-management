import DOMPurify from 'isomorphic-dompurify'

export const sanitize = (text: string) => {
  return DOMPurify.sanitize(text)
}

export const renderDangerous = {
  span: (html: string = '') => {
    const sanitized = sanitize(html)
    return <span dangerouslySetInnerHTML={{ __html: sanitized }} />
  },
  div: (html: string = '') => {
    const sanitized = sanitize(html)
    return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
  },
}
