import { defineComponent, renderSlot } from 'vue'
import classes from './style.module.css'

export default defineComponent({
  name: 'WelcomeItem',
  setup(_, { slots }) {
    return () => (
      <div class={classes.item}>
        <i>{renderSlot(slots, 'icon')}</i>
        <div class={classes.details}>
          <h3>{renderSlot(slots, 'heading')}</h3>
          {renderSlot(slots, 'default')}
        </div>
      </div>
    )
  },
})
