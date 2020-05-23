import React from "react";

import Spinner from "../spinner/spinner.component";

// withSpinner loads the spinner only if isLoading=true otherwise it just renders wrapped component
// collection page expects collections so the spinner has to load until the collections are fetched
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
