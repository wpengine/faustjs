import flatListToHierarchical from '../../src/utils/flatListToHierarchical';

const items = [
  { Id: '1', Name: 'abc', Parent: '2' },
  { Id: '2', Name: 'abc', Parent: '' },
  { Id: '3', Name: 'abc', Parent: '5' },
  { Id: '4', Name: 'abc', Parent: '2' },
  { Id: '5', Name: 'abc', Parent: '' },
  { Id: '6', Name: 'abc', Parent: '2' },
  { Id: '7', Name: 'abc', Parent: '6' },
  { Id: '8', Name: 'abc', Parent: '6' },
];

const result = [
  {
    Id: '1',
    Name: 'abc',
    Parent: '2',
    children: [],
  },
  {
    Id: '2',
    Name: 'abc',
    Parent: '',
    children: [],
  },
  {
    Id: '3',
    Name: 'abc',
    Parent: '5',
    children: [],
  },
  {
    Id: '4',
    Name: 'abc',
    Parent: '2',
    children: [],
  },
  {
    Id: '5',
    Name: 'abc',
    Parent: '',
    children: [],
  },
  {
    Id: '6',
    Name: 'abc',
    Parent: '2',
    children: [],
  },
  {
    Id: '7',
    Name: 'abc',
    Parent: '6',
    children: [],
  },
  {
    Id: '8',
    Name: 'abc',
    Parent: '6',
    children: [],
  },
];

describe('utils/flatListToHierarchical', () => {
  test('returns a hierarchical list from items array', () => {
    //@ts-ignore
    expect(flatListToHierarchical(items)).toEqual(result);
  });
});
