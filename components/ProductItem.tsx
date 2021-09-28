/* eslint-disable react/display-name */
import { memo, useState } from 'react';
import { AddProductToWishlistProps } from './AddProductToWishlist';
import dynamic from 'next/dynamic';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => { 
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
  },{
    loading: () => <span>Carregando...</span>
  })

interface ProductItemProps {
  product:{
    id: number,
    price: number,
    priceFormatted: string;
    title: string,
  }
  onAddToWishList: (id: number) => void;
}
function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddProductToWishlist, setAddProductToWishlist] = useState(false);

  return (
  <div>
    {product.title} - <strong>{product.priceFormatted}</strong>
    <button 
      onClick={() => setAddProductToWishlist(true)}
    >Add to wishlist</button>
    {
      isAddProductToWishlist && (
        <AddProductToWishlist
          onAddProductToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setAddProductToWishlist(false)}
        />
      )
    }
  </div>
)
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  //comparacao detalhada do objeto
  return Object.is(prevProps.product, nextProps.product
    )
})