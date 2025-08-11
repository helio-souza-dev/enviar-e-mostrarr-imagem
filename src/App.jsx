import React, { useState } from 'react';
import './App.css';

// --- Componente de Rodapé ---
function Footer() {
  return (
    <footer>
      <p>Feito para aprender, por mim mesmo kkkkk</p>
    </footer>
  );
}

// --- Componente para selecionar o tipo de upload ---
function TipoDeSistema({ tipoSelecionado, onTipoChange }) {
  return (
    <div className="select-group">
      <label htmlFor="tipo-upload">Tipo de Upload: </label>
      <select 
        id="tipo-upload"
        value={tipoSelecionado}
        onChange={(e) => onTipoChange(e.target.value)}
      >
        <option value="link">URL da Web</option>
        <option value="pc">Arquivo do Computador</option>
      </select>
    </div>
  );
}


function InserirImagem({ tipoSelecionado }) {
  const [imagemExibida, setImagemExibida] = useState('');
  const [urlInput, setUrlInput] = useState('');


  const handleExibirClick = () => {
    setImagemExibida(urlInput);
  };

  const handleImagemUploadPC = (evento) => {
    const file = evento.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemExibida(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApagarClick = () => {
    setImagemExibida('');
    setUrlInput('');
  };


  if (tipoSelecionado === 'link') {
    return (
      <div className="card">
        <h2>Insira a URL da imagem</h2>
        <div className="input-group">
          <input
            type='text'
            placeholder='https://exemplo.com/imagem.png'
            value={urlInput}
            onChange={(evento) => setUrlInput(evento.target.value)}
          /><br /><br />
          <button onClick={handleExibirClick}>Exibir Imagem</button>
        </div>
        <hr />
        {/* A área de exibição da imagem */}
        {imagemExibida && (
          <div className="image-container">
            <h3>Sua imagem:</h3>
            <img
              className='imginsert'
              src={imagemExibida}
              alt="Imagem enviada pelo usuário"
            />
            <button onClick={handleApagarClick} className="delete-button">
              Apagar Imagem
            </button>
          </div>
        )}
      </div>
    );
  }

  if (tipoSelecionado === 'pc') {
    return (
      <div className="card">
        <h2>Upload do Computador</h2>
        <div className="input-group">
          <input type="file" accept='image/*' onChange={handleImagemUploadPC} />
        </div>
        <hr />
        {imagemExibida && (
          <div className="image-container">
            <h3>Sua imagem:</h3>
            <img
              className='imginsert'
              src={imagemExibida}
              alt="Imagem enviada pelo usuário"
            /><br /><br />
            <button onClick={handleApagarClick} className="delete-button">
              Apagar Imagem
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}


// --- Componente Principal da Aplicação ---
function App() {
  const [tipoDeUpload, setTipoDeUpload] = useState('link');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Portfólio de Imagens</h1>

        <TipoDeSistema 
          tipoSelecionado={tipoDeUpload} 
          onTipoChange={setTipoDeUpload} 
        />
        
        <InserirImagem tipoSelecionado={tipoDeUpload} />
      </header>
      <Footer />
    </div>
  );
}

export default App;
