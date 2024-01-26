import { describe, expect, it } from 'vitest'

import { HttpPostClientSpy } from '../__mocks__/data'
import { RemoteAuthentication } from '../src/data/usecases/authentication'

// SUT = System Under Test

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any-url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    httpPostClientSpy,
    sut
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct values', async () => {
    const url = 'other-url'
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
