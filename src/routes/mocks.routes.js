import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mockGenerator.js';
import { UserService, PetService } from '../services/index.js';

const router = Router();

// ✅ GET: /api/mocks/mockingusers → solo devuelve 50 usuarios mock
router.get('/mockingusers', async (req, res) => {
  try {
    const users = generateMockUsers(50);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 🟨 POST: /api/mocks/generateData → crea y guarda usuarios y mascotas
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
