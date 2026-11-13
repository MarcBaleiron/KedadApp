/**
 * Tiny DOM helpers. Content is always set through textContent / attributes,
 * never innerHTML, so user input can't be executed (XSS protection).
 */

/**
 * @param {string} tag
 * @param {{className?: string, text?: string, attrs?: Record<string, string>}} [options]
 * @param {...(Node|string)} children
 * @returns {HTMLElement}
 */
export function el(tag, { className, text, attrs = {} } = {}, ...children) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
    node.append(...children);
    return node;
}
