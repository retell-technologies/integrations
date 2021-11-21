export function getLastDOMElement(selector: string): Element | undefined {
  return Array.from(document.querySelectorAll(selector)).pop()
}
