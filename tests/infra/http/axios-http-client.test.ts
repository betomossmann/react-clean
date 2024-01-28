import { faker } from '@faker-js/faker'
import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'

vi.mock('axios')

const mockedPostAxios = vi.mocked(axios, true).post

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  body: faker.helpers.objectValue({ myObj: 'myValue' }),
  url: faker.internet.url()
})

describe('AxiosHttpClient', () => {
  it('Should call axios with correct url and verb', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedPostAxios).toHaveBeenCalledWith(request.url)
  })
})
