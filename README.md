# automatic-heading-level

A lightweight, accessible React utility that automatically manages heading levels (`<h1>` to `<h6>`) based on nesting depth using React Context.

## Installation

Install the package via npm

```
npm install automatic-heading-level
```

## Usage

1. Place the `PageHeadingRoot` at the top level of your component tree (or the start of a specific page) to initialize the heading level at 1.

```javascript
import { PageHeadingRoot } from 'automatic-heading-level'

function App() {
  return (
    <PageHeadingRoot>
      {/* Your app content */}
    </PageHeadingRoot>
  )
}
```

2. Use the `Section` component to define different areas of your page. Every time you nest a Section inside another, the internal heading level increments automatically. You can specify the HTML tag used for the section (e.g., `section`, `article`, `main`, `div`) using the as prop.

```javascript
import { Section, AutoHeading } from 'automatic-heading-level'

const MyPage = () => (
  <Section as="main">
    <AutoHeading>Main Page Title (H1)</AutoHeading>
    
    <Section as="section">
      <AutoHeading>Subsection Title (H2)</AutoHeading>
      
      <Section as="section">
        <AutoHeading>Deep Topic (H3)</AutoHeading>
      </Section>
    </Section>
  </Section>
)
```

3. Automatic vs. Manual Headings
  - `AutoHeading`, renders the appropriate h1-h6 tag based on its position in the `Section` tree.
  - `Heading`, allows you to manually override the level using the as prop (e.g., as="h2") while still inheriting styles if provided.

4. Components API

`Section`
  | Prop | Type | Description |
  | ------------- | ------------- | ------------- |
  | `as` | `main`, `section`, `article`, `footer`, `header` `div` | The HTML element to render |
  | `identifier` | `string` | Used for accessibility (`aria-labelledby`) only available for `main`, `section`, `article`, `footer`, `header` |
  | `className` | `string` | Custom CSS classes for styling |

`AutoHeading`
  | Prop | Type | Description |
  | ------------- | ------------- | ------------- |
  | `id` | `string` | HTML ID is recommended to match the `Section` identifier for accessibility |
  | `className` | `string` | Custom CSS classes for styling |

`Heading`
  | Prop | Type | Description |
  | ------------- | ------------- | ------------- |
  | `as` | `string` | Manual override (e.g., "h1", "h2") |

## Custom styling

This library is "headless" and does not include default CSS. You should pass your own styles via the className prop to match your project's design system.

## Contribution

If you found a bug and you only want to report it:
- Open an issue with the tag "enhancement."
- Describe the feature you'd like to see and why it would be useful.

If you found a bug and want to fix it by yourself (thankss):
- Fork the repository and create your branch from `main`
- Install dependencies `npm install` to set up the development environment, including Vite and Tailwind for the demo
- If you are modifying the core logic, focus on `src/context/HeadingContext.tsx`
- If you are adding utility functions, use `src/utils/helper.ts`
- Ensure the demo app still works by running `npm run dev` and checking the `LevelIndicator` to verify the context levels increment correctly
- Run `npm run build` to ensure the library bundles correctly into the dist folder
- Open a Pull Request with a clear description of your changes

If you enjoyed the library and it is useful to you, you can [invite me a coffee](https://ko-fi.com/micaavigliano) to support me!
