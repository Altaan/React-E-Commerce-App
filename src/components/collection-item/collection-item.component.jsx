import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";

import { addItem } from "../../redux/cart/cart.actions";
import "./collection-item.styles.scss";

// this component is responsible for the structure of a single item in collection-preview and collection page
// the item prop is passed from either the collection-preview component or the collection page
const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

// allowing this component to dispatch addItem action to add the item to cart reducer
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
