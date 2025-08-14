import { useState } from "react";
import PageLayout from "../../Component/PageLayout/PageLayout";
import Loading from "../../Component/general/Loading";

function UploadCvs() {
  const [loading, setLoading] = useState();
  const [selectFile, setSelectFile] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    setErrorMessage("");
    const fichier = e.target.files[0];
    console.log("🔎file", fichier);

    if (!fichier) {
      setSelectFile(null);
      return;
    }

   

    if (fichier.size > MAX_FILE_SIZE) {
    const sizeMB = (fichier.size / 1024 / 1024).toFixed(2);
    setErrorMessage(`❌ Fichier trop grand (${sizeMB}MB). Limite: 5MB`);
    return;
}
     setSelectFile(fichier);
     console.log('✅bon fichier choisi')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "appel du service pour envoie au back et mise en place du component loading le temps de recherche"
    );
  };

  return (
    <PageLayout
      title={"Mise à jour des profils"}
      subtitle={"Téléchargement du fichier CVS"}
      affichenom={true}
    >
      <div className="card">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="filechoice">
            <h2>Choisir le Fichier :</h2>
          </label>
          <input type="file" accept=".csv" onChange={(e) => handleChange(e)} />
          <button type="submit">Valider</button>
        </form>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </PageLayout>
  );
}
export default UploadCvs;
