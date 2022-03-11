/**
 * Merges all style objects provided from first to last
 * @param {...Object} var_args
 * @returns {Object} Merges reactStyle object
 */
export function mergeStyles () {
  // Object that will hold all merged data
  const merged = {}

  // Process all objects
  for (let i = 0; i < arguments.length; i++) {
    // Validation
    if (typeof arguments[i] !== 'object') continue

    // Assign the object
    Object.assign(merged, arguments[i])
  }

  // Return the merged data
  return merged
}

/**
 * Concatinates all unique classes
 * @param {...String} var_args
 * @returns Concatinated string of unique classes
 */
export function mergeClasses () {
  // String that will contain all concatinated classes
  let classes = ''

  // Process all classes
  for (let i = 0; i < arguments.length; i++) {
    // Skip of not string
    if (typeof arguments[i] !== 'string') continue

    // Split on space to get all parts, this is to clean up double spaces and make sure that two identical classes cannot be added twice
    const parts = arguments[i].trim().split(' ')

    // Loop through and add all unique classes
    for (const part of parts) {
      if (!part || classes.includes(part)) { continue }
      classes += `${part} `
    }
  }

  return classes.trim()
}
