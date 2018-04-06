import { h } from 'preact'
import style from './style.scss'

import Button from '@mamba/button'

export default () => {
  return (
    <div className={style.home}>
      <h1>Home</h1>
      <a href="#page1">Page 1</a>
      <a href="#page2">Page 2</a>
      <a href="#page3">Page 3</a>
      <a href="#page4">Page 4</a>
      <Button
        text="Mamba Button"
        className="mb-button mb-button-red"
        onClick={() => {
          alert('mamba')
        }}
      />
      <Button
        text="Mamba Button 2"
        className="mb-button mb-button-green"
        onClick={() => {
          alert('mamba')
        }}
      />
    </div>
  )
}
