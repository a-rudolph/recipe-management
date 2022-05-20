export const recipes: RecipeType[] = [
  {
    name: 'Saturday white bread',
    key: 'saturday-white-bread',
    btf: 'samedayer',
    bulk: 5,
    proof: 1.25,
    start: 8,
    foldCount: 3,
    times: {
      bulk: [5],
      proof: [1.25],
    },
    yield: {
      amount: 2,
      unit: 'Loaves',
    },
    ingredients: [
      {
        quantity: 1000,
        unit: 'g',
        name: 'white flour',
        category: 'flour',
      },
      {
        quantity: 720,
        unit: 'g',
        name: 'water',
        extra: '90 - 95°F',
        category: 'water',
      },
      {
        quantity: 21,
        unit: 'g',
        name: 'fine salt',
        category: 'salt',
      },
      {
        quantity: 4,
        unit: 'g',
        name: 'yeast',
        category: 'yeast',
      },
    ],
  },
  {
    name: 'Overnight white bread',
    key: 'overnight-white-bread',
    btf: 'overnight',
    bulk: 13,
    proof: 1.25,
    start: 19,
    foldCount: 3,
    times: {
      bulk: [12, 14],
      proof: [1.25],
    },
    yield: {
      amount: 2,
      unit: 'Loaves',
    },
    ingredients: [
      {
        quantity: 1000,
        unit: 'g',
        name: 'white flour',
        category: 'flour',
      },
      {
        quantity: 780,
        unit: 'g',
        name: 'water',
        extra: '90 - 95°F',
        category: 'water',
      },
      {
        quantity: 22,
        unit: 'g',
        name: 'fine salt',
        category: 'salt',
      },
      {
        quantity: 0.8,
        unit: 'g',
        name: 'yeast',
        category: 'yeast',
      },
    ],
  },
  {
    name: 'Overnight whole wheat',
    key: 'overnight-whole-wheat',
    btf: 'overnight',
    bulk: 5,
    proof: 13,
    start: 15,
    foldCount: 3,
    times: {
      bulk: [5],
      proof: [12, 14],
    },
    yield: {
      amount: 2,
      unit: 'Loaves',
    },
    ingredients: [
      {
        quantity: 600,
        unit: 'g',
        name: 'white flour',
        category: 'flour',
      },
      {
        quantity: 400,
        unit: 'g',
        name: 'whole wheat flour',
        category: 'flour',
      },
      {
        quantity: 800,
        unit: 'g',
        name: 'water',
        extra: '90 - 95°F',
        category: 'water',
      },

      {
        quantity: 22,
        unit: 'g',
        name: 'fine salt',
        category: 'salt',
      },
      {
        quantity: 3,
        unit: 'g',
        name: 'yeast',
        category: 'yeast',
      },
    ],
  },
]
