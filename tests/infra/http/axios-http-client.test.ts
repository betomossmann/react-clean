import axios from 'axios'
import { describe, expect, it, Mocked, vi } from 'vitest'

import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { mockPostRequest } from '@/tests/data/mocks'
import { mockAxios } from '@/tests/infra/mocks'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    mockedAxios,
    sut
  }
}

describe('AxiosHttpClient', () => {
  describe('Post', () => {
    it('Should call axios with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('Should return the correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.post(mockPostRequest())
      const axiosResponse = await mockedAxios.post.mock.results[0].value
      expect(httpResponse).toEqual({
        body: axiosResponse.data,
        statusCode: axiosResponse.status
      })
    })
  })
})
