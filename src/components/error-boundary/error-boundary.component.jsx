import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from "./error-boundary.styles";

// this class component is used to catch errors thrown by other components
class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  // the method below catches any error that gets thrown in the children of this class component
  static getDerivedStateFromError(error) {
    // returning an obj to set the state of this class to be aware of any errors
    return { hasErrored: true };
  }

  // the method below gives the error and info about it
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
          <ErrorImageText> Sorry this page is broken </ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    // render the children if no error happened
    return this.props.children;
  }
}

export default ErrorBoundary;
