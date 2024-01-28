import { faker } from '@faker-js/faker'
import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { AxiosHttpClient } from '@/infra/http/axios-http-client'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

describe('AxiosHttpClient', () => {
  it('Should call axios with correct url', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
