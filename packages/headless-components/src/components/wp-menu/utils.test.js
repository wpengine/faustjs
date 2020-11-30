import { getMenuLocation } from './utils'

describe('getMenuLocation', () => {
  it('filters by location', () => {
    const items = [
      { title: 'Home', parentId: null, locations: ['PRIMARY'] },
      { title: 'Legal', parentId: null, locations: ['FOOTER'] }
    ]

    const expected = [
      {
        title: 'Home',
        parentId: null,
        locations: ['PRIMARY'],
        children: []
      }
    ]

    const result = getMenuLocation('primary', items)

    expect(result).toEqual(expected)
  })

  it('orders menu items', () => {
    const items = [
      { title: 'About', parentId: null, locations: ['PRIMARY'], order: 2 },
      { title: 'Home', parentId: null, locations: ['PRIMARY'], order: 1 }
    ]

    const expected = [
      {
        title: 'Home',
        parentId: null,
        locations: ['PRIMARY'],
        order: 1,
        children: []
      },
      {
        title: 'About',
        parentId: null,
        locations: ['PRIMARY'],
        order: 2,
        children: []
      }
    ]

    const result = getMenuLocation('primary', items)

    expect(result).toEqual(expected)
  })

  it('moves children to parents', () => {
    const items = [
      { title: 'Home', key: 'abc', parentId: null, locations: ['PRIMARY'] },
      { title: 'Submenu', parentId: 'abc', locations: ['PRIMARY'] }
    ]

    const expected = [
      {
        title: 'Home',
        key: 'abc',
        parentId: null,
        locations: ['PRIMARY'],
        children: [
          {
            title: 'Submenu',
            parentId: 'abc',
            locations: ['PRIMARY'],
            children: []
          }
        ]
      }
    ]

    const result = getMenuLocation('primary', items)

    expect(result).toEqual(expected)
  })
})
