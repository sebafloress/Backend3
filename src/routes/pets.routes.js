
import { Router } from 'express';
import { PetModel } from '../models/Pet.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const pets = await PetModel.find().populate('owner');
        res.json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
