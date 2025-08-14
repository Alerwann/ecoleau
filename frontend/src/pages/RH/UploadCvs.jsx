import { useState } from "react";
import PageLayout from "../../Component/PageLayout/PageLayout";
import Loading from "../../Component/general/Loading";
import { useCurrentUser } from "../../Hook/useCurrentUser";

function UploadCvs() {
  const [loading, setLoading] = useState();

  const { identifiant, role } = useCurrentUser();

  const [selectFile, setSelectFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [boutonActiv, setboutonActiv] = useState(false);

  const handleChange = (e) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    setErrorMessage("");
    const fichier = e.target.files[0];
    console.log("🔎file", fichier);

    if (!fichier) {
      setSelectFile(null);
      return;
    }
    if (!identifiant) {
      setLoading(true);
      return;
    }

    if (fichier.size > MAX_FILE_SIZE) {
      const sizeMB = (fichier.size / 1024 / 1024).toFixed(2);
      setErrorMessage(`❌ Fichier trop grand (${sizeMB}MB). Limite: 5MB`);
      setboutonActiv(false); 
      setSelectFile(null);
      return;
    }
    setSelectFile(fichier);
    setboutonActiv(true);
    console.log("✅bon fichier choisi");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🔎 identifiant RH", identifiant);

    const formData = new FormData();
    formData.append("csvFile", selectFile);
    formData.append("identifiant", identifiant);
    formData.append("role", role);

    // 3. Envoyer (on verra ça après)
    console.log("FormData créé avec le fichier:", selectFile.name);
  };

  if (loading) {
    setErrorMessage("❌ Chargement en cours...");
    return;
  }

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
          <button
            type="submit"
            className={` btn-valide ${boutonActiv ? "" : "disable"}`}
          >
            Valider
          </button>
        </form>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </PageLayout>
  );
}
export default UploadCvs;
