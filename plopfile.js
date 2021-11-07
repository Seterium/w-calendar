function existValidator(value, field) {
  return value && value.length
    ? true
    : `${field} is required`
}

module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'Create new page component',
    prompts: [
      {
        type: 'input',
        name: 'NAME',
        message: 'Name:',
        validate: value => existValidator(value, 'Name')
      },
      {
        type: 'input',
        name: 'PATH',
        message: 'Path:',
        default: '',
      }
    ],
    actions: () => [
      {
        type: 'addMany',
        templateFiles: 'plop/page/*.vue',
        base: 'plop/page/',
        destination: './src/pages/{{ camelCase PATH }}/',
        skipIfExists: true,
      },
      {
        type: 'addMany',
        templateFiles: 'plop/page/*.scss',
        base: 'plop/page/',
        destination: './src/assets/styles/pages/{{ camelCase PATH }}/',
        skipIfExists: true,
      },
    ],
  })

  plop.setGenerator('component', {
    description: 'Create new component',
    prompts: [
      {
        type: 'input',
        name: 'NAME',
        message: 'Name:',
        validate: value => existValidator(value, 'Name')
      },
      {
        type: 'input',
        name: 'PATH',
        message: 'Path (from /components, opening and trailind / required ):',
        default: '/',
      }
    ],
    actions: () => [
      {
        type: 'addMany',
        templateFiles: 'plop/component/*.vue',
        base: 'plop/component/',
        destination: './src/components/{{ PATH }}',
        skipIfExists: true
      },
      {
        type: 'addMany',
        templateFiles: 'plop/component/*.scss',
        base: 'plop/component/',
        destination: './src/assets/styles/components/{{ PATH }}',
        skipIfExists: true
      },
    ],
  })

  plop.setGenerator('store', {
    description: 'Create new Vuex store module',
    prompts: [{
      type: 'input',
      name: 'NAME',
      message: 'Name:',
      validate: value => existValidator(value, 'Name')
    }],
    actions: () => [{
      type: 'addMany',
      templateFiles: 'plop/store/**',
      base: 'plop/store/',
      destination: './src/store/{{ camelCase NAME }}/',
      skipIfExists: true,
    }],
  })
}
