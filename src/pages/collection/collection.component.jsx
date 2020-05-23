import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

// this page is accessed from shop and home pages to view the entire items in the selected collection
const CollectionPage = ({ collection }) => {
  // selectCollection dynamically changes the collection passed to this component based on the route the user is on
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// mapStateToProps 1st param is the entire state and the 2nd param is the props of the component being wrapped by connect
const mapStateToProps = (state, ownProps) => ({
  // the state is being passed to the returned func from selectCollection because this selector needs a part of the state, depending on the URL param.
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
