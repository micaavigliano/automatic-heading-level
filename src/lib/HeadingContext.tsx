import { createContext, useContext, type ReactNode, type HTMLAttributes } from "react"

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const HeadingLevelContext = createContext<number>(1)

export const useHeadingLevel = () => {
  return useContext(HeadingLevelContext)
}

export const PageHeadingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <HeadingLevelContext.Provider value={0}>
      {children}
    </HeadingLevelContext.Provider>
  )
}
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  identifier: string
  as: string
}

type SectionComponent = 'main' | 'section' | 'article' | 'footer' | 'header' | 'div'
export const Section = ({ as, children, className = "", identifier, ...props }: SectionProps) => {
  const current = useContext(HeadingLevelContext)
  const next = Math.min(current + 1, 6)
  const Element = as as SectionComponent

  const accessibilityProps: { id?: string; 'aria-labelledby'?: string } = {}
  
  if (Element !== 'div' && identifier) {
    accessibilityProps.id = `${identifier}-section`
    accessibilityProps['aria-labelledby'] = `${identifier}-heading`
  }

  return (
    <HeadingLevelContext.Provider value={next}>
      <Element
        className={className}
        {...accessibilityProps}
        {...props}
      >
        {children}
      </Element>
    </HeadingLevelContext.Provider>
  )
}

export interface AutoHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  id?: string
}

export const AutoHeading = ({ children, className = "", id, ...props }: AutoHeadingProps) => {
  const level = useContext(HeadingLevelContext)
  const safeLevel = Math.min(Math.max(level, 1), 6)
  const Tag = `h${safeLevel}` as HeadingLevel

  const idProp = id ? { id: `${id}-heading` } : {}

  return (
    <Tag 
      className={className} 
      {...idProp}
      {...props}
    >
      {children}
    </Tag>
  )
}

// 6. Manual heading. sometimes the user needs/want to use a specific level regardless the nesting.
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: string
  id?: string
  children: ReactNode
}

export const Heading = ({ as, children, className = "", id, ...props }: HeadingProps) => {
  const ctxLevel = useContext(HeadingLevelContext)
  const level = as ? parseInt(as.replace('h', ''), 10) : ctxLevel
  const safeLevel = Math.min(Math.max(level, 1), 6)
  const Tag = `h${safeLevel}` as HeadingLevel

  return (
    <Tag className={className} id={id} {...props}>
      {children}
    </Tag>
  )
}