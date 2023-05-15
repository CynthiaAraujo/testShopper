import { Request, Response } from 'express';
import { UpdatePricesService } from '../services/UpdatePricesService';
import { ValidateFileService } from '../services/ValidateFileService';

class PricesController {
  async validateFile(req: Request, res: Response) {
      const { file } = req;

      if (!file) {
        return res.status(400).json({ error: 'É necessário enviar um arquivo.' })
      }

      const { path } = file;
  
      const validateFileService = new ValidateFileService();

      const validatedProducts = await validateFileService.execute({ path });

      return res.json({ validatedProducts });  
  }
  
  async updatePrices(req: Request, res: Response) {
      const { validatedProducts } = req.body;
  
      const updatePricesService = new UpdatePricesService();

      const updatedPrices = await updatePricesService.execute({ validatedProducts });

      return res.json({ updatedPrices })
  }
}

export { PricesController };

