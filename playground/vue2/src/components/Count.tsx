import { Component, Vue } from "vue-property-decorator";
import "./count.css";

@Component
export default class CountBtn extends Vue {
  count = 0;
  add() {
    this.count += 1;
  }
  render() {
    return (
      <div>
        <button class="color" onClick={this.add}>
          text {this.count}
        </button>
      </div>
    );
  }
}
