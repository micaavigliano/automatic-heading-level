import { useState } from 'react'
import { PageHeadingRoot, Section, AutoHeading, Heading, useHeadingLevel } from './lib/HeadingContext'
import { TestIsolated1 } from './components/TestIsolated1'
import { DeeperIsolated } from './components/DeeperIsolated'

const LevelIndicator = () => {
  const level = useHeadingLevel()
  return (
    <div className="inline-block px-3 py-1 text-xs font-mono text-white bg-indigo-500 rounded-md mb-2">
      Current Context Level: {level}
    </div>
  )
}

export default function App() {
  const [showExtraSection, setShowExtraSection] = useState(false)

  const handleExtraSection = () => {
    setShowExtraSection(!showExtraSection)
  }

  return (
    <Section
      as="main"
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-8 min-h-screen"
      identifier="root"
    >
      <PageHeadingRoot>
        <AutoHeading className="text-3xl font-bold mb-2" id="root">
          React Context Pattern: Auto-Headings
        </AutoHeading>
        <p>
          This demo shows how <code>useContext</code> can automatically manage heading levels
          (h1, h2, h3...) based on nesting depth.
        </p>
        <br />
        <p>This is the most important and main topic. From here we are going to deep dive into another sections and increase the heading level.</p>

        <Section className="p-8" as="div" identifier="demo-subsection-1">
          <div className="mb-8 border-b border-gray-100 pb-4">
            <LevelIndicator />
            <AutoHeading id="demo-subsection-1">First Major topic</AutoHeading>
            <p className="text-gray-600 mb-4">
              This is the main subsection and major topic of the page. The heading above is automatically an <code>{`<h1>`}</code>.
            </p>
          </div>

          <Section identifier='first-major-section' as="section">
            <LevelIndicator />
            <AutoHeading id='first-major-section'>First subtopic of the first main topic</AutoHeading>
            <p className="text-gray-600 mb-4">
              We are now inside a <code>{`<Section>`}</code>, which can be customized with the desire element. In this case, it is a <code>{`<section>`}</code> tag. The context level incremented automatically.
            </p>

            <TestIsolated1 />

            <Section identifier='subsection-a' as="section">
              <LevelIndicator />
              <AutoHeading id='subsection-a'>Subsection of the heading level 3 </AutoHeading>
              <p className="text-gray-600 mb-4">
                Nested deeper. This becomes an <code>{`<h4>`}</code> without us telling it to.
              </p>
            </Section>

            <Section identifier='subsection-b' as="section">
              <LevelIndicator />
              <AutoHeading id='subsection-b'>Subsection of the heading level 3</AutoHeading>
              <p className="text-gray-600 mb-4">
                Another sibling subsection. Also an <code>{`<h4>`}</code>.
              </p>

              <Section identifier='deeply-nested-topic' as="section">
                <LevelIndicator />
                <AutoHeading id='deeply-nested-topic'>Deeply Nested Topic</AutoHeading>
                <p className="text-gray-600">
                  We can keep going. This is an <code>{`<h5>`}</code>.
                </p>
              </Section>
            </Section>
          </Section>

          <Section identifier='second-major-section' as="section">
            <LevelIndicator />
            <AutoHeading id='second-major-section'>Second subtopic of the first main topic</AutoHeading>
            <p className="text-gray-600 mb-4">
              Depending the position of the section in the tree, the heading level will be different. This is an <code>{`<h2>`}</code> because it is a sibling of the first major topic section.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-6">
              <AutoHeading className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Interactive Demo</AutoHeading>
              <p className="mb-4 text-sm text-gray-600">
                Click the button to dynamically mount a new nested section. Notice how it picks up the correct level context immediately.
              </p>

              <br />

              <p className='mb-4'>This is a great point to make recursive heading. Maybe for future interations</p>

              <button
                onClick={handleExtraSection}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                {showExtraSection ? 'Remove Section' : 'Add Dynamic Section'}
              </button>

              {showExtraSection && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <Section
                    as="section"
                    identifier="dynamic-section"
                    className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <LevelIndicator />
                    <AutoHeading id='dynamic-section'>Dynamic Content</AutoHeading>
                    <p className="text-gray-600">
                      I was added dynamically, but I still know I should be an <code>{`<h3>`}</code> because of where I live in the tree.
                    </p>

                    <Section identifier='dynamic-subsection' as="section">
                      <AutoHeading id='dynamic-subsection'>Even Deeper</AutoHeading>
                      <p>I am an <code>{`<h4>`}</code>.</p>
                      <DeeperIsolated />
                    </Section>
                  </Section>
                </div>
              )}
            </div>
          </Section>

          <Section identifier='manual-override-example' as="section">
            <AutoHeading id='manual-override-example'>Manual Override Example</AutoHeading>
            <p className="text-gray-600 mb-4">
              Sometimes you need to force a specific level regardless of nesting.
            </p>
            <div className="p-4 border border-dashed border-gray-300 rounded-lg">
              <Heading as="h2" className="text-3xl font-bold text-pink-600 mb-2">
                Forced H2
              </Heading>
              <p className="text-sm text-gray-500">
                Even though we are deep in the tree (Level 3 context), this is forced to render as an <code>{`<h2>`}</code> using the <code>as="h2"</code> prop.
              </p>
            </div>
          </Section>
        </Section>
      </PageHeadingRoot>
    </Section>
  )
}