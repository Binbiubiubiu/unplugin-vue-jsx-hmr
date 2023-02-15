import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld'
import TheWelcome from './components/TheWelcome'
import Logo from './assets/logo.svg'
import classes from './style.module.css'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <header>
          <img
            alt="Vue logo"
            class={classes.logo}
            src={Logo}
            width="125"
            height="125"
          />

          <div class={classes.wrapper}>
            <HelloWorld msg="You did it!" />
          </div>
        </header>

        <main>
          <TheWelcome />
        </main>
      </>
    )
  },
})
