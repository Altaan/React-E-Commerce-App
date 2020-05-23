import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

// this component is used to render first 4 items from every collection as preview on the shop page
// the title and items of every collection are passed from collection-overview component
const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">
      <Link
        // Redirecting the user to the specific collection when the title of the collection is clicked on
        to={`/shop/${title.toLowerCase()}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        {title.toUpperCase()}
      </Link>
    </h1>
    <div className="preview">
      {items
        // IMPORTANT: the functions below get called everytime this functional comp gets rendered or rerendered
        // so performance issues can happen if the data passed to filter() & map() are large!!
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
