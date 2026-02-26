export const getSizeClass = (lvl: number) => {
  if (lvl === 1) return "text-4xl font-extrabold text-gray-900 mb-6"
  if (lvl === 2) return "text-3xl font-bold text-gray-800 mb-4"
  if (lvl === 3) return "text-2xl font-semibold text-gray-700 mb-3"
  if (lvl === 4) return "text-xl font-medium text-gray-600 mb-2"
  if (lvl === 5) return "text-lg font-medium text-gray-500 mb-2"
  if (lvl === 6) return "text-base font-medium text-gray-400 mb-1"
  return "text-base"
}
