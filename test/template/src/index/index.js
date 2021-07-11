import React from "react";
import ReactDOM from "react-dom";

import "./main.scss";
import Img from "./avatar_me.png";
import add from "../../common/index";
import tree from "./tree-shaking";

const addBig = require("my-large-number-test");
console.log(addBig.add);

if (false) {
  tree.b();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
    };
  }
  loadComponent() {
    import("./Text.js").then(({ default: Text }) => {
      this.setState({
        text: Text,
      });
    });
  }
  render() {
    const funcA = tree.a();
    const { text: Text } = this.state;
    const addResult = addBig.add("999", "1");
    return (
      <div>
        <div className="test">I am from index.js test</div>
        <img src={Img} alt="" onClick={this.loadComponent.bind(this)} width="100" />
        <div>{add(1, 2)}</div>
        <div>{funcA}</div>
        {Text ? <Text /> : null}
        {addResult}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
