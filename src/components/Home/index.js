import './style.scss'

import Button from '@mamba/button'

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
    </div>
  )
}
