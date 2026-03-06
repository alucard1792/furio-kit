/** @param {import('plop').NodePlopAPI} plop */
export default function (plop) {
  // Helpers
  plop.setHelper('upperFirst', (str) => str.charAt(0).toUpperCase() + str.slice(1))

  // ─── Entity ─────────────────────────────────────────────────────────────────
  plop.setGenerator('entity', {
    description: 'Create a new FSD entity slice',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Entity name (singular, kebab-case, e.g. product):',
        validate: (v) => /^[a-z][a-z0-9-]*$/.test(v) || 'Use kebab-case (e.g. product)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/types.ts',
        templateFile: 'plop-templates/entity/model/types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/api/get-{{name}}s.ts',
        templateFile: 'plop-templates/entity/api/get-items.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/ui/{{pascalCase name}}Card.tsx',
        templateFile: 'plop-templates/entity/ui/Card.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/index.ts',
        templateFile: 'plop-templates/entity/index.ts.hbs',
      },
    ],
  })

  // ─── Feature ─────────────────────────────────────────────────────────────────
  plop.setGenerator('feature', {
    description: 'Create a new FSD feature slice',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (kebab-case, e.g. add-to-cart):',
        validate: (v) => /^[a-z][a-z0-9-]*$/.test(v) || 'Use kebab-case (e.g. add-to-cart)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{name}}/ui/{{pascalCase name}}Form.tsx',
        templateFile: 'plop-templates/feature/ui/Form.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/actions/{{name}}-action.ts',
        templateFile: 'plop-templates/feature/actions/action.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/index.ts',
        templateFile: 'plop-templates/feature/index.ts.hbs',
      },
    ],
  })

  // ─── Widget ──────────────────────────────────────────────────────────────────
  plop.setGenerator('widget', {
    description: 'Create a new FSD widget slice',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Widget name (kebab-case, e.g. user-sidebar):',
        validate: (v) => /^[a-z][a-z0-9-]*$/.test(v) || 'Use kebab-case (e.g. user-sidebar)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/widgets/{{name}}/ui/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/widget/ui/Widget.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/widgets/{{name}}/index.ts',
        templateFile: 'plop-templates/widget/index.ts.hbs',
      },
    ],
  })
}
