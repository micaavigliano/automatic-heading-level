import { AutoHeading, Section } from "../lib/HeadingContext"

export const DeeperIsolated = () => {
  return (
    <Section identifier="isolated-component-1" as="section">
      <AutoHeading id="isolated-component-1">Bottom of the iceberg</AutoHeading>
      <p>It seems we reached level 6. Interesting.</p>
    </Section>
  )
}