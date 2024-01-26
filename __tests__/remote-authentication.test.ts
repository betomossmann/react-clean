import { describe, expect, it } from 'vitest'

import { HttpPostClient } from '../src/data/protocols/http'
import { RemoteAuthentication } from '../src/data/usecases/authentication'

// SUT = System Under Test

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct values', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any-url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
