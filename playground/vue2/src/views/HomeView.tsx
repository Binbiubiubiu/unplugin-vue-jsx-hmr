import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld";
import Logo from '@/assets/logo.png'

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={Logo} />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
      </div>
    );
  }
}
