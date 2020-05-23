import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import "./collections-overview.styles.scss";

// this component gets the collections to pass them to collection-preview comp to create preview for every collection
const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

// collections are selected from the shop reducer after they were fetched from the database
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
