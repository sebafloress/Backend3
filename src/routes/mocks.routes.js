import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mockGenerator.js';
import { UserService, PetService } from '../services/index.js';

const router = Router();

/**
 * Endpoint que genera usuarios mock y permite definir la cantidad vía query (?count=10)
 */
router.get('/mockingusers', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 50;
    const users = generateMockUsers(count);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * Nuevo endpoint que genera mascotas mock (no guarda en DB)
 */
router.get('/mockingpets', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 50;
    const pets = generateMockPets(count);
    res.json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * Endpoint para guardar usuarios y mascotas mock en la base de datos
 */
router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = users > 0 ? generateMockUsers(users) : [];
    const mockPets = pets > 0 ? generateMockPets(pets) : [];

    const [createdUsers, createdPets] = await Promise.all([
      users > 0 ? UserService.createMany(mockUsers) : [],
      pets > 0 ? PetService.createMany(mockPets) : []
    ]);

    res.json({
      status: 'success',
      payload: { users: createdUsers, pets: createdPets }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
