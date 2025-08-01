function Error({ message, title = "Erreur" }) { // ✅ Props destructurées
  return (
    <div>
      <h1>{title}</h1> {/* ✅ Titre personnalisable */}
      <p style={{color: 'red'}}>Erreur: {message}</p> {/* ✅ message depuis props */}
    </div>
  );
}



export default Error