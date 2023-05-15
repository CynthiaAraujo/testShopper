import csv from 'csv-parser';
import fs from 'fs';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { AppError } from '../utils/AppError';

interface IValidateFileProps {
  path: string;
}

interface IProduct {
  product_code: string;
  new_price: string;
}

interface IValidatedProduct {
  product?: {
    code: number;
    name: string;
    sales_price: number;
    new_price: number | string;
  }
  errorMessage?: string;
}

class ValidateFileService {
  async execute({ path }: IValidateFileProps) {
    const products = [] as IProduct[];
    const validatedProducts = [] as IValidatedProduct[];

    const productsRepository = new ProductsRepository();

    try {
      return new Promise<IValidatedProduct[]>((resolve) => {
        fs.createReadStream(path)
          .pipe(csv())
          .on('data', (data) => products.push(data))
          .on('end', async () => {
            await Promise.all(
              products.map(async product => {
                if (!product.product_code) {
                  validatedProducts.push({
                    errorMessage: 'O produto deve ter um código.'
                  });

                  return;
                }

                const productCode = Number(product.product_code);

                const dbProduct = await productsRepository.findByCode(productCode)

                if (!dbProduct) {
                  validatedProducts.push({
                    product: {
                      code: productCode,
                      name: '',
                      sales_price: 0,
                      new_price: product.new_price,
                    },
                    errorMessage: 'O produto com esse código não existe.'
                  })

                  return;
                }

                const productToBeValidated = {
                  code: productCode,
                  name: dbProduct.name,
                  sales_price: Number(dbProduct.sales_price),
                }

                const productNewPrice = Number(product.new_price);

                if (!product.new_price || isNaN(productNewPrice)) {
                  validatedProducts.push({
                    product: {
                      ...productToBeValidated,
                      new_price: product.new_price,
                    },
                    errorMessage: 'O preço deve ser um valor numérico válido.'
                  });

                  return;
                }

                if (productNewPrice < Number(dbProduct.cost_price)) {
                  validatedProducts.push({
                    product: {
                      ...productToBeValidated,
                      new_price: productNewPrice,
                    },
                    errorMessage: 'O novo preço não pode ser menor que o preço de custo.'
                  });

                  return;
                }

                if (productNewPrice < (0.9 * productToBeValidated.sales_price) || productNewPrice > (1.1 * productToBeValidated.sales_price)) {
                  validatedProducts.push({
                    product: {
                      ...productToBeValidated,
                      new_price: productNewPrice,
                    },
                    errorMessage: 'O reajuste de preço não pode ser maior ou menor do que 10% do preço atual do produto.'
                  });

                  return;
                }

                console.log(dbProduct);

                if (dbProduct.product_id_to_products.length) {
                  const pack = products.find(
                    (p) => BigInt(p.product_code) === dbProduct.product_id_to_products[0].pack_id
                  );

                  if (!pack) {
                    validatedProducts.push({
                      product: {
                        ...productToBeValidated,
                        new_price: productNewPrice,
                      },
                      errorMessage: 'O preço do pacote deste produto também deve ser reajustado.'
                    });

                    return;
                  }
                }

                if (dbProduct.pack_id_to_products.length) {
                  let packProductsNewPricesSum = 0;

                  await Promise.all(
                    dbProduct.pack_id_to_products.map(async packProduct => {
                      const productPackage = products.find(
                        (p) => BigInt(p.product_code) === packProduct.product_id
                      );

                      if (!productPackage) {
                        const dbProductPackage = await productsRepository.findByCode(Number(packProduct.product_id));

                        packProductsNewPricesSum += (Number(dbProductPackage?.sales_price) ?? 0) * Number(packProduct.qty);
                      } else {
                        packProductsNewPricesSum += Number(productPackage.new_price) * Number(packProduct.qty);
                      }
                    })
                  );

                  if (productNewPrice !== packProductsNewPricesSum) {
                    validatedProducts.push({
                      product: {
                        ...productToBeValidated,
                        new_price: productNewPrice,
                      },
                      errorMessage: 'O preço do pacote deve ser a soma dos preços de seus produtos.'
                    });

                    return;
                  }
                }

                validatedProducts.push({
                  product: {
                    ...productToBeValidated,
                    new_price: productNewPrice,
                  },
                });
              })
            )

            resolve(validatedProducts);
          })
      });
    } catch (e) {
      const error = e as Error;

      throw new AppError(error.message, 500)
    }

  }
}

export { ValidateFileService };

