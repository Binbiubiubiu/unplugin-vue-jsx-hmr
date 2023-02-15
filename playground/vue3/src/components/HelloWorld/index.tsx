import { defineComponent, ref } from 'vue'
import Count from './count'
import classes from './style.module.css'

interface Props {
  msg: string
}

export default defineComponent<Props>({
  name: 'HelloWorld',
  components: {
    Count,
  },
  setup(props) {
    const c = ref(0)
    return () => (
        <div class={classes.greetings}>
          <Count/>
          <button onClick={() => { c.value++ }}>count: {c.value}</button>
        <h1 class="green">{props.msg}</h1>
        <h3>
          You’ve successfully created a project with
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
        </h3>
      </div>
    )
  },
})
