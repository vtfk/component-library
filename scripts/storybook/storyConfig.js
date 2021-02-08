const storyConfig = {
  parameters: {
    options: {
      showPanel: true
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'docs'
  }
}

function getConfig ({ component, title, ...conf }) {
  return { ...storyConfig, title: `Komponenter/${title}`, component, ...conf }
}

export { storyConfig, getConfig }
