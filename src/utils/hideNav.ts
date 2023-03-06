const hideNav = (name: string) => {
  const body = document.querySelector('body')
  const nav = document.querySelector('header')
  const modal = document.querySelector(`[aria-label="${name}"]`)

  if (modal?.classList.contains('block')) {
    nav?.classList.add('hidden')
    body?.classList.add('scrollbar-hide')
    body?.classList.remove('scrollbar-default')
  } else {
    nav?.classList.remove('hidden')
    body?.classList.remove('scrollbar-hide')
    body?.classList.add('scrollbar-default')
  }
}

export default hideNav
