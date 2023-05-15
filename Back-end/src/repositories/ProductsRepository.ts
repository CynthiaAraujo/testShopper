import { PrismaClient } from '@prisma/client';
import { IValidProduct } from '../services/UpdatePricesService';

class ProductsRepository {
  private prisma = new PrismaClient();

  async findByCode(code: number) {
    const product = this.prisma.products.findUnique({
      where: {
        code
      },
      include: {
        pack_id_to_products: true,
        product_id_to_products: true,
      }
    })

    return product
  }

  async save(product: IValidProduct) {
    const { new_price, ...updatedProduct } = product;
    
    return this.prisma.products.update({
      where: {
        code: product.code,
      },
      data: {
        ...updatedProduct,
        sales_price: new_price,
      },
    })
  }
}

export { ProductsRepository };

