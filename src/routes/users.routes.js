import { Router } from 'express';
import { UserService } from '../services/users.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;