import { faker } from '@faker-js/faker'
import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'

vi.mock('axios')

const mockedAxios = vi.mocked(axios, true)
const mockedAxiosPostResult = {
  data: faker.helpers.objectValue({ myObj: 'myValue' }),
  status: faker.number.int()
}
mockedAxios.post.mockResolvedValue(mockedAxiosPostResult)

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
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('Should return the correct response on axios.post', async () => {
      const sut = makeSut()
      const httpResponse = await sut.post(mockPostRequest())
      expect(httpResponse).toEqual({
        body: mockedAxiosPostResult.data,
        statusCode: mockedAxiosPostResult.status
      })
    })
  })
})
