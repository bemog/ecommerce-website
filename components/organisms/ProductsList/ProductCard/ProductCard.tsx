import { FC } from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.scss';

type Props = {
  title: string,
  image: string,
  category: string,
  shortDescription: string,
  price: string,
}

const ProductCard:FC<Props> = ({
  title, image, category, shortDescription, price,
}) => {
  const linkTitle = title.split(' ').join('-').toLowerCase();

  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{shortDescription}</p>
      <p>{price}</p>
      <div className={styles.btnsContainer}>
        <button type="button">
          <Link href={`/products/${category}/${linkTitle}`}>
            <a>Details</a>
          </Link>
        </button>
        <button type="button">
          <p>Add to cart</p>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;