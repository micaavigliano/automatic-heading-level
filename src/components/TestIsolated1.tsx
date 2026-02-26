import { AutoHeading, Section } from "../lib/HeadingContext"

export const TestIsolated1 = () => {
  return (
    <Section identifier="isolated-component-1" as="section">
      <AutoHeading id="isolated-component-1">An injected isolated component 1</AutoHeading>
      <p>This is a test to check if the automatic heading levels work in isolated components correctly. I hope they do!!</p>
      <br />
      <p>Well, it worked. We can use the context in reusable components.</p>
    </Section>
  )
}