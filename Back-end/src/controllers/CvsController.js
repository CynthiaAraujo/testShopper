const fs = require('fs');
const csv = require('csv-parser');
const { validationResult } = require('express-validator');

class CvsController {
  validateFile = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const produtos = [];
      const { path } = req.file;
  
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => produtos.push(data))
        .on('end', async () => {
          const codigos = produtos.map((produto) => produto.Codigo);
  
          const [rows] = await pool.query(
            'SELECT Codigo FROM Produtos WHERE Codigo IN (?)',
            [codigos]
          );
  
          const codigosExistentes = rows.map((row) => row.Codigo);
  
          const produtosValidos = produtos.filter((produto) =>
            codigosExistentes.includes(produto.Codigo)
          );
  
          const erros = [];
  
          produtosValidos.forEach((produto) => {
            if (!produto.Preco || isNaN(produto.Preco)) {
              erros.push({
                codigo: produto.Codigo,
                mensagem: 'O preço deve ser um valor numérico válido'
              });
            }
  
            if (produto.Preco < produto.Custo) {
              erros.push({
                codigo: produto.Codigo,
                mensagem: 'O preço não pode ser menor que o custo'
              });
            }
  
            if (produto.Pacote) {
              const pacote = produtosValidos.find(
                (p) => p.Codigo === produto.Pacote
              );
  
              const precoComponentes = pacote.Componentes.reduce(
                (total, componente) => total + componente.Preco,
                0
              );
  
              if (produto.Preco !== precoComponentes) {
                erros.push({
                  codigo: produto.Codigo,
                  mensagem: 'O preço do pacote deve ser a soma dos componentes'
                });
              }
  
              const custoComponentes = pacote.Componentes.reduce(
                (total, componente) => total + componente.Custo,
                0
              );
  
              produto.Custo = custoComponentes;
            }
          });
  
          if (erros.length > 0) {
            return res.status(400).json({ erros });
          }
  
          req.produtosValidos = produtosValidos;
          next();
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  };
  
  atualizarPrecos = async (req, res) => {
    try {
      const { produtosValidos } = req;
  
      const precosAtualizados = await Promise.all(
        produtosValidos.map(async (produto) => {
          await pool.query(
            'UPDATE Produtos SET Preco = ?, Custo = ? WHERE Codigo = ?',
            [produto.Preco, produto.Custo, produto.Codigo]
          );
  
          return {
            codigo: produto.Codigo,
            nome: produto.Nome,
            precoAtual: produto.Preco,
          }
        })
      )
  
      return precosAtualizados;
    } catch (error) {}
  }
  
}

module.exports = CvsController;