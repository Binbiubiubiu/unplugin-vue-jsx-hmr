import { defineComponent, ref } from 'vue'
import classes from './a.module.css'

export default defineComponent({
  name: 'Count',
  setup() {
    const c = ref(0)
    return () => (
        <button class={classes['red-btn']} onClick={() => { c.value++ }}>{c.value}</button>
    )
  },
})
