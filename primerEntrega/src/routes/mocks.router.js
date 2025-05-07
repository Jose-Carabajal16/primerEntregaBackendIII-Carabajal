import { Router } from 'express';
import { generateMockUsers } from '../mocking/userMocker.js';
import { User } from '../models/User.js';
import { Pet } from '../models/Pet.js';
import { faker } from '@faker-js/faker';

const router = Router();

// GET → /api/mocks/mockingpets (migrado)
router.get('/mockingpets', (req, res) => {
  const pets = Array.from({ length: 10 }, () => ({
    name: faker.animal.cat(),
    type: faker.helpers.arrayElement(['cat', 'dog']),
    age: faker.number.int({ min: 1, max: 15 })
  }));
  res.json({ status: 'success', pets });
});

// GET → /api/mocks/mockingusers
router.get('/mockingusers', async (req, res) => {
  const users = await generateMockUsers(50);
  res.json({ status: 'success', users });
});

// POST → /api/mocks/generateData
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    // se crea usuarios
    const mockUsers = await generateMockUsers(users);
    const createdUsers = await User.insertMany(mockUsers);

    // se crea las mascotas
    const mockPets = Array.from({ length: pets }, () => ({
      name: faker.animal.dog(),
      type: faker.helpers.arrayElement(['dog', 'cat', 'rabbit']),
      age: faker.number.int({ min: 1, max: 15 })
    }));
    const createdPets = await Pet.insertMany(mockPets);

    res.json({
      status: 'success',
      inserted: {
        users: createdUsers.length,
        pets: createdPets.length
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
