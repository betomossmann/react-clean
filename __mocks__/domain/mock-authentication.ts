import { faker } from '@faker-js/faker'

import { AuthenticationParams } from '../../src/domain/usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
