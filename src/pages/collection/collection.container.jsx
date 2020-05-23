import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

const mapStateToProps = createStructuredSelector({
  // isLoading has to be true to load the spinner while the collections are being fetched
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

// containers don't render anything they're used to pass props down to components
// compose evaluates from right to left
const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
