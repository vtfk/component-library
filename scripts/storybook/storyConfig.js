const storyConfig = {
  parameters: {
    options: {
      showPanel: true,
      panelPosition: 'right',
      selectedPanel: 'storybookjs/knobs/panel',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'canvas'
  }
}

function getConfig ({ component, title, ...conf }) {
  return { ...storyConfig, title: `Komponenter/${title}`, component, ...conf }
}

export { storyConfig, getConfig }
