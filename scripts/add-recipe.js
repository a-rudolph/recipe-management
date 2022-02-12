const _isArray = require('lodash/isArray')
const _isNumber = require('lodash/isNumber')
const inquirer = require('inquirer')

const recipe = {
  name: 'input',
  key: 'input',
  brt9: ['overnight', 'sameday'],
  bulk: 'number',
  proof: 'number',
  start: 'number',
  //   ingredient: [],
}

const questions = Object.entries(recipe).map(([name, meta]) => {
  const base = {
    name,
    message: name,
  }

  if (_isArray(meta)) {
    return {
      ...base,
      type: 'list',
      choices: meta,
    }
  }

  if (_isNumber(meta)) {
    return {
      ...base,
      type: 'number',
    }
  }

  return {
    ...base,
    type: 'input',
  }
})

const addRecipe = async () => {
  const answers = await inquirer.prompt(questions)

  console.log(answers)
}

addRecipe()
