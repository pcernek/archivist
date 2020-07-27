import { LocalStorage } from './LocalStorage';

/**
 * TODO: clean up after every test
 */

describe(LocalStorage.name, () => {
  
  const data = { foo: 'a', bar: 42, ding: null, dong: undefined }

  it('stores and retrieves a resource', async () => {
    const store = await LocalStorage.build('dummy')
    const id = await store.create(data)
    const fetchedData = await store.findById(id)
    expect(fetchedData).toEqual(data)
  })

  it('lists stored resources', async () => {
    const store = await LocalStorage.build('dummy')
    await store.clear()
    const id1 = await store.create(data)
    const id2 = await store.create(data)
    const ids = await store.list()
    expect(ids).toContain(id1)
    expect(ids).toContain(id2)
  })

  it('deletes stored resources', async () => {
    const store = await LocalStorage.build('dummy')
    await store.create(data)
    await store.clear()
    const ids = await store.list()
    expect(ids).toHaveLength(0)
  })
})
