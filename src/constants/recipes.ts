export const recipes: RecipeType[] = [
  {
    name: 'Overnight 40% whole wheat',
    key: 'overnight-whole-wheat',
    times: {
      bulk: [5],
      proof: [12, 14],
    },
    yield: {
      amount: 2,
      unit: 'Loaves',
    },
    ingrendients: [
      {
        quantity: 600,
        unit: 'g',
        name: 'white flour',
      },
      {
        quantity: 400,
        unit: 'g',
        name: 'whole wheat flour',
      },
      {
        quantity: 800,
        unit: 'g',
        name: '90ºF - 95ºF water',
      },
      {
        quantity: 22,
        unit: 'g',
        name: 'fine sea salt',
      },
      {
        quantity: 3,
        unit: 'g',
        name: 'instant yeast',
      },
    ],
  },
  {
    name: 'Saturday white bread',
    key: 'saturday-white-bread',
    times: {
      bulk: [5],
      proof: [1.25],
    },
    yield: {
      amount: 2,
      unit: 'Loaves',
    },
    ingrendients: [
      {
        quantity: 1000,
        unit: 'g',
        name: 'white flour',
      },
      {
        quantity: 720,
        unit: 'g',
        name: '90ºF - 95ºF water',
      },
      {
        quantity: 21,
        unit: 'g',
        name: 'fine sea salt',
      },
      {
        quantity: 4,
        unit: 'g',
        name: 'instant yeast',
      },
    ],
  },
]
