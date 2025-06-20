import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    });
};

const getUserById = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    });
};

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (role === 'admin' && req.user && req.user.role !== 'admin') {
            return res.status(403).send('Seul un administrateur peut créer un autre administrateur.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).send('Utilisateur créé avec succès');
    } catch (error) {
        res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mot de passe invalide');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ userId: user._id, role: user.role, token });
    } catch (error) {
        res.status(500).send('Erreur lors de la connexion');
    }
};

// Exporter les fonctions avec la syntaxe ES Modules
export { getAllUsers, createUser, getUserById, updateUser, deleteUser, signup, login };
