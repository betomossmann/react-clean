import { faker } from '@faker-js/faker'
import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { AxiosHttpClient } from '@/infra/http/axios-http-client'

vi.mock('axios')

const mockedPostAxios = vi.mocked(axios, true).post

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  it('Should call axios with correct url', async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedPostAxios).toHaveBeenCalledWith(url)
  })

  it('Should call axios with correct url and verb', async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedPostAxios).toHaveBeenCalledWith(url)
  })
})
