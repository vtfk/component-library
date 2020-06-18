const storyConfig = {
	parameters: {
		options: {
			showPanel: true,
		},
	},
}

function getConfig({ component, title }) {
	return { ...storyConfig, title: `Komponenter/${title}`, component }
}

export { storyConfig, getConfig }
