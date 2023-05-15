import { ProductsRepository } from "../repositories/ProductsRepository";

export interface IValidProduct {
  code: number;
  name: string;
  sales_price: number;
  new_price: number;
}

interface IUpdatePricesServiceProps {
  validatedProducts: Array<{ product: IValidProduct }>
}

class UpdatePricesService {
  async execute({ validatedProducts }: IUpdatePricesServiceProps) {
    const productsRepository = new ProductsRepository();

    const updatedProducts = await Promise.all(
      validatedProducts.map(async validatedProduct => {
        return productsRepository.save(validatedProduct.product)
      })
    )

    return updatedProducts.map(product => ({
      ...product,
      code: Number(product.code)
    }));
  }
}

export { UpdatePricesService };

