import { faker } from '@faker-js/faker'
import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'

vi.mock('axios')

const mockedPostAxios = vi.mocked(axios, true).post
const mockedAxiosResult = {
  data: faker.helpers.objectValue({ myObj: 'myValue' }),
  status: faker.number.int()
}
mockedPostAxios.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  body: faker.helpers.objectValue({ myObj: 'myValue' }),
  url: faker.internet.url()
})

describe('AxiosHttpClient', () => {
  describe('Post', () => {
    it('Should call axios with correct values', async () => {
      const request = mockPostRequest()
      const sut = makeSut()
      await sut.post(request)
      expect(mockedPostAxios).toHaveBeenCalledWith(request.url, request.body)
    })

    it('Should return the correct response on axios.post', async () => {
      const sut = makeSut()
      const httpResponse = await sut.post(mockPostRequest())
      expect(httpResponse).toEqual({
        body: mockedAxiosResult.data,
        statusCode: mockedAxiosResult.status
      })
    })
  })
})
