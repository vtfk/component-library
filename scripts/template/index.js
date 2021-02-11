const { readdirSync } = require('fs')
const { join } = require('path')
const basePath = join(__dirname, '../../src/ui')

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Add a component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the components name?',
        default: 'FooBar'
      }
    ],
    actions: () => {
      const name = '{{pascalCase componentName}}'
      const templatePath = join(__dirname, 'component')
      const templateFiles = readdirSync(templatePath)

      return [
        ...templateFiles.map(file => ({
          type: 'add',
          force: true,
          path: `${basePath}/${name}/${file.replace(/^component/, name).replace(/.hbs/, '')}`,
          templateFile: `${templatePath}/${file}`,
          abortOnFail: true
        }))
      ]
    }
  })
}
