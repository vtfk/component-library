const storyConfig = {
  parameters: {
    options: {
      showPanel: true
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'docs'
  }
}

function getConfig ({ component, title }) {
  return { ...storyConfig, title: `Komponenter/${title}`, component }
}

export { storyConfig, getConfig }
