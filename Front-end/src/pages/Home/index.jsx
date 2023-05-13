import { useState } from "react";
import userIcon from "../../assets/icon-user.svg";
import Button from "../../components/Button";
import Header from "../../components/Header";

import "./styles.scss";

export function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState([]);

  async function handleFileInput(event) {
    setSelectedFile(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const response = await fetch("/clients/csv", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const results = await response.json();
      setCsvData(results);
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
        <Button title="Validar" />
        <Button title="Atualizar" />
      </div>
    </div>
  );
}
