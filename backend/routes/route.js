const express = require('express');
const router = express.Router();
const User = require('../models/User');


// POST /api/login
router.post('/login', async (req, res) => {
  const { identifiant, password } = req.body;
  
  try {
    const user = await User.findOne({ identifiant });
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Identifiants invalides' });

    res.json({ success: true, user: { id: user._id, identifiant: user.identifiant } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/create -> création de personnes
router.post('/create', async(req,res)=>{
    try{
        const{identifiant, password} =req.body;

        if (!identifiant || !password)
        {
            return res.status(400).json({message : 'tous les champs sont requis'});

        }
    const newUser = new User({
        identifiant,
        password
    })
const savedUser = await newUser.save();
// Puis vous pouvez directement modifier l'objet

   const userResponse = {
      _id: savedUser._id,
      identifiant: savedUser.identifiant,
      // Ne pas inclure le password !
      __v: savedUser.__v
    };

    res.status(201).json({
        message: 'utilisateur créé avec succès',
        user : userResponse
    });
    }catch (error) { 
    console.error('Erreur lors de la création:', error);

    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Un utilisateur avec cet identifiant existe déjà'
      });
    }

    // Erreur serveur générique
    return res.status(500).json({ 
      message: 'Erreur lors de la création de l\'utilisateur',
      error: error.message 
    });
  }
})

// GET /api/users -> retour de la liste des identifiants
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'identifiant'); 
    
    res.status(200).json({
      count: users.length,
      identifiants: users.map(user => user.identifiant)
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération',
      error: error.message 
    });
  }
});

// DELET /api/:identifiant

router.delete('/users/:identifiant', async (req, res) => {
  try {
    const result = await User.deleteOne({ identifiant: req.params.identifiant });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet identifiant' });
    }

    res.status(200).json({ 
      message: 'Utilisateur supprimé avec succès',
      identifiant: req.params.identifiant
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression',
      error: error.message 
    });
  }
});


module.exports = router;