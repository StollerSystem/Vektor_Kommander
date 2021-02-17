export function render(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].render()
  }
}