import './style.scss'

import Button from '@mamba/button'
import { Tabs, Tab } from '@mamba/tabs'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

const handleTabChange = index => {
  console.log(`handleTabChange: index(${index})`) // eslint-disable-line
}

const handleActive = () => {
  console.log('Item 1 activated') // eslint-disable-line
}

export default () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <Button
        text="Mamba Button"
        className="mb-button"
        onClick={() => {
          alert('mamba')
        }}
      />
      <br />
      <section>
        <Tabs onChange={handleTabChange}>
          <Tab label="First Tab">
            <div>
              <h2 style={styles.headline}>Headline first tab</h2>
              <p>This is an example tab.</p>
              <p>You can put anything here or preact component.</p>
            </div>
          </Tab>
          <Tab label="Second Tab" onActive={handleActive}>
            <div>
              <h2 style={styles.headline}>Headline second tab</h2>
              <p>This is another tab example. A Disabled tab!</p>
            </div>
          </Tab>
          <Tab label="Disabled Tab" disabled>
            Disabled content
          </Tab>
          <Tab label="Hidden Tab" hidden>
            <div>
              <h2 style={styles.headline}>Fourth Tab hidden</h2>
              <p>This the fourth tab content.</p>
            </div>
          </Tab>
          <Tab label="Fifth">
            <br />
            <p>Fifth content paragraph</p>
          </Tab>
        </Tabs>
      </section>
    </div>
  )
}
