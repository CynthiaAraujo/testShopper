import { useState } from "react";
import { toast } from "react-toastify";
import userIcon from "../../assets/icon-user.svg";
import { Button } from "../../components/Button";
import Header from "../../components/Header";
import { updatePrices, validateFile } from "../../services/api";

import "./styles.scss";

export function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [allValidated, setAllValidated] = useState(false);

  async function handleFileInput(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleValidation() {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const { validatedProducts } = await validateFile(formData);

      const isAllValid = !validatedProducts.filter(
        (product) => product.errorMessage,
      ).length;

      setCsvData(validatedProducts);

      if (isAllValid) {
        setAllValidated(isAllValid);
      }

      toast.success("Arquivo validado com sucesso!");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao validar o arquivo. Por favor, verifique se o arquivo está correto e tente novamente.",
      );
    }
  }

  async function handleUpdate() {
    try {
      await updatePrices({ validatedProducts: csvData });
      toast.success("Preços atualizados com sucesso!");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao atualizar os preços. Por favor, tente novamente.",
      );
    }
  }

  return (
    <div className="homeContainer">
      <Header nameUser="Nome do Usuário" userIcon={userIcon} />
      <div className="mainHome">
        <input type="file" onChange={handleFileInput} />
        <ul>
          <li>
            <ul>
              {csvData.map(({ product, errorMessage }) => (
                <li key={product.code}>
                  <strong>Código:</strong> {product.code}
                  <br />
                  <strong>Produto:</strong> {product.name}
                  <br />
                  <strong>Preço de venda:</strong> R$ {product.sales_price}
                  <br />
                  <strong>Novo preço:</strong> R$ {product.new_price}
                  <br />
                  <strong>Mensagem de Erro:</strong> {errorMessage}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <Button title="Validar" onClick={handleValidation} />
        <Button
          title="Atualizar"
          onClick={handleUpdate}
          disabled={!allValidated}
          className={!allValidated ? "hideButton" : ""}
          style={{ backgroundColor: "#2da77a" }}
        />
      </div>
    </div>
  );
}
