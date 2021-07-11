// import React from "react";
// import "./main.scss";
// import Img from "./avatar_me.png";
// import add from "../../common/index";
// import tree from "./tree-shaking";

const React = require("react");
require("./main.scss");
const Img = require("./avatar_me.png");
const add = require("../../common/index");
const tree = require("./tree-shaking");

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
    return (
      <div>
        <div className="test">I am from index.js test</div>
        <img src={Img} alt="" onClick={this.loadComponent.bind(this)} width="100" />
        <div>{add(1, 2)}</div>
        <div>{funcA}</div>
        {Text ? <Text /> : null}
      </div>
    );
  }
}

module.exports = <App />;
