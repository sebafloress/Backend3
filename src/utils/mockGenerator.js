import { faker } from '@faker-js/faker/locale/es';

const generateMockUsers = (count) => {
    return Array.from({ length: count }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        password: 'coder123', // Se encripta luego en UserService
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    }));
};

const generateMockPets = (count) => {
    return Array.from({ length: count }, () => ({
        name: faker.animal.dog(),
        specie: 'dog',
        birthDate: faker.date.past({ years: 10 })
    }));
};

export { generateMockUsers, generateMockPets };
