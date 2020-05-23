import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

// this page shows the preview of all collections and allows the user to click on the title of any collection to view // all items in the selected collection
// This component is nested in Route component in App.js so history, location and match obj are passed automatically
const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    // once the component mounts fetchCollectionsStart() is called to start fetching the data from the database
    fetchCollectionsStart();
  }, [fetchCollectionsStart]); // only re-run the effect if fetchCollectionsStart changes

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        {/* Using match.path, which gives the current path /shop , to have a flexible path that can be used in other places, like in the 2nd Route to have access to the different collections */}
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        {/* /:collectionId allows to access collectionId as parameter on match obj when the user is inside the 
        collection page. So :collectionId gives dynamic url, where there are multiple parameters that can lead to 
        different pages like shop/hats or shop/mens */}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

// fetching the collections from shop reducer to render them after the component is mounted
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
