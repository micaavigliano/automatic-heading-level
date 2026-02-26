import { createContext, useContext, type ReactNode, type HTMLAttributes } from "react"
import { getSizeClass } from "../utils/helper"

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

// 1. Create the Context
const HeadingLevelContext = createContext<number>(1)

// 2. Custom Hook to consume the context in different components

export const useHeadingLevel = () => {
  return useContext(HeadingLevelContext)
}

// 3. Root Provider (resets to level 1). This is a really important component. It will wrap the entire codebase and it can be use in different context.
export const PageHeadingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <HeadingLevelContext.Provider value={1}>
      {children}
    </HeadingLevelContext.Provider>
  )
}

// 4. This is a vital component since here we are going to choose which HTML tag we want to use to create the sections of our page. Of course you can add more HTML tags to the list of types. For the POC sake, I only selected four.
interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  identifier: string
  as: string
}

type SectionComponent = 'main' | 'section' | 'article' | 'div'

export const Section = ({ as, children, className = "", identifier, ...props }: SectionProps) => {
  const current = useContext(HeadingLevelContext)
  const next = Math.min(current + 1, 6)
  const Element = as as SectionComponent

  return (
    <HeadingLevelContext.Provider value={next}>
      <Element
        className={`pl-4 border-l-2 border-gray-200 ml-2 my-4 ${className}`}
        aria-labelledby={`heading-${current}`}
        {...props}
      >
        {children}
      </Element>
    </HeadingLevelContext.Provider>
  )
}

// 5. AutoHeading Component (renders h1-h6 based on context)
interface AutoHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  id?: string
}

export const AutoHeading = ({ children, className = "", id, ...props }: AutoHeadingProps) => {
  const level = useContext(HeadingLevelContext)
  const safeLevel = Math.min(Math.max(level,1), 6)
  const Tag = `h${safeLevel}` as HeadingLevel

  return (
    <Tag 
      className={`${getSizeClass(safeLevel)} ${className}`} 
      id={id}
      {...props}
    >
      {children}
      <span className="ml-3 text-xs font-normal text-blue-800 bg-blue-50 px-2 py-1 rounded-full align-middle">
        {`<h${safeLevel}>`}
      </span>
    </Tag>
  )
}

// 6. Manual heading. sometimes the user needs/want to use a specific level regardless the nesting.
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
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