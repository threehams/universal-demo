import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App'
import UsageHero from './UsageHero'
import Loading from './Loading'
import NotFound from './NotFound'
import { pages, nextIndex, indexFromPath } from '../utils'
import { Route, Link } from 'react-router-dom'

const AsyncFoo = universal(() => import(`./Foo`))
const AsyncBar = universal(() => import(`./Bar`))
const AsyncBaz = universal(() => import(`./Baz`))
const AsyncRudy = universal(() => import(`./Rudy`))
const AsyncExample = universal(() => import(`./Example`))
const AsyncReduxFirstRouter = universal(() => import(`./ReduxFirstRouter`))
const AsyncUniversal = universal(() => import(`./Universal`))
const AsyncFaceySpacey = universal(() => import(`./FaceySpacey`))

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: false
    }
  }

  render() {
    const { loading } = this.state
    const loadingClass = loading ? styles.loading : ''
    const buttonClass = `${loadingClass}`

    return (
      <div className={styles.container}>
        <h1>Hello Reactlandia</h1>

        <UsageHero />

        <Route path="/" component={AsyncFoo} />
        <Route path="/Foo" component={AsyncFoo} />
        <Route path="/Bar" component={AsyncBar} />
        <Route path="/Baz" component={AsyncBaz} />
        <Route path="/Rudy" component={AsyncRudy} />
        <Route path="/Example" component={AsyncExample} />
        <Route path="/ReduxFirstRouter" component={AsyncReduxFirstRouter} />
        <Route path="/Universal" component={AsyncUniversal} />
        <Route path="/FaceySpacey" component={AsyncFaceySpacey} />

        <Link to="/Bar" className={buttonClass}>
          Change Page
        </Link>

        <p>
          <span>*why are you looking at this? refresh the page</span>
          <span>and view the source in Chrome for the real goods</span>
        </p>
      </div>
    )
  }
}
