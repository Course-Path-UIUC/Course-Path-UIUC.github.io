import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <main>
    <h1>Course Path</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p>Course path applies topological graph sorting to a list of classes to display them in an order that satisfies prerequisites.</p>
  </main>
`

setupCounter(document.querySelector('#counter'))
