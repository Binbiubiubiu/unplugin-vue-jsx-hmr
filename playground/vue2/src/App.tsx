import { Component, Vue } from "vue-property-decorator";
import "./app.css";

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </nav>
        <router-view />
      </div>
    );
  }
}
