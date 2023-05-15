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

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const results = await validateFile(formData);
      setCsvData(results);
      setAllValidated(false);
      toast.success("Arquivo processado com sucesso!");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao processar o arquivo. Por favor, tente novamente.",
      );
    }
  }

  async function handleValidation() {
    try {
      const validatedProducts = await validateFile({ file: selectedFile });

      setCsvData(validatedProducts);
      setAllValidated(true);
      toast.success("Arquivo validado com sucesso!");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao validar o arquivo. Por favor, verifique se o arquivo está correto e tente novamente.",
      );
    }
  }

  async function handleUpdate() {
    try {
      const updatedPrices = await updatePrices({ validatedProducts: csvData });
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
          {csvData.map((row, index) => (
            <li key={index}>{JSON.stringify(row)}</li>
          ))}
        </ul>
        <Button title="Validar" onClick={handleValidation} />
        <Button
          title="Atualizar"
          onClick={handleUpdate}
          disabled={!allValidated}
        />
      </div>
    </div>
  );
}
