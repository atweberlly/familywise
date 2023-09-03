export default function marquee(selector: string, speed: number): void {
  const parentSelector = document.querySelector(selector) as HTMLElement
  const clone = parentSelector.innerHTML
  const firstElement = parentSelector.children[0] as HTMLElement
  let i = 0

  parentSelector.insertAdjacentHTML('beforeend', clone)

  setInterval(() => {
    firstElement.style.marginLeft = `-${i}px`

    if (i > firstElement.clientWidth) {
      i = 0
    }

    i += speed
  }, 0)
}
