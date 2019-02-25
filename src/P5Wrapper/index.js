import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class P5Wrapper extends Component {
  componentDidMount() {
    this.canvas = new window.p5(this.props.sketch, this.wrapper)
    this.canvas.wrapper = this.wrapper
    this.canvas.props = this.props.p5Props
    this.canvas.onSetAppState = this.props.onSetAppState
  }

  shouldComponentUpdate(nextProps) {
    this.canvas.props = nextProps.p5Props
    return false
  }

  componentWillUnmount() {
    this.canvas.remove()
  }

  render() {
    return <div
      id="canvas-container"
      className="d-flex justify-content-center align-items-center w-100 h-100 bg-dark"
      ref={wrapper => this.wrapper = wrapper}
    />
  }
};

P5Wrapper.propTypes = {
  sketch: PropTypes.func.isRequired,
  p5Props: PropTypes.object.isRequired,
  onSetAppState: PropTypes.func.isRequired,
};
