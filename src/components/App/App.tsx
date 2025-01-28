import { useState } from 'react'
import styles  from 'components/App/App.module.css'
import {User} from "components/User";

export const  App = ()=> {
  const [count, setCount] = useState(0)

  return (
      <div className={styles.root}>
          <h1>Vite + React</h1>
          <div className="{styles.card}">
              <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
              </button>
              <User name={"1111"}/>
          </div>

          <p className="read-the-docs">
              Click on the Vite and React logos to learn more
          </p>
      </div>
  )
}


