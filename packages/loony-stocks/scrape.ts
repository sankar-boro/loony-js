class Node {
    nodeName: string;
    children: Node[] = [];
    textContent: string | null = null;

    constructor(nodeName: string) {
        this.nodeName = nodeName;
    }
}

class Element extends Node {
    attributes: Record<string, string> = {};

    constructor(nodeName: string, attributes: Record<string, string>) {
        super(nodeName);
        this.attributes = attributes;
    }
}

class TextNode extends Node {
    constructor(text: string) {
        super("#text");
        this.textContent = text;
    }
}

function tokenize(html: string): string[] {
    const tokens: string[] = [];
    const regex = /<\/?([a-zA-Z1-6]+)([^>]*)>|([^<]+)/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
        if (match[0][0] === "<") {
            // If it's a tag (either opening or closing)
            tokens.push(match[0]);
        } else if (match[3]) {
            // Text content
            tokens.push(match[3].trim());
        }
    }

    return tokens.filter((x) => x !== "");
}

function parseAttributes(attrString: string): Record<string, string> {
    const attributes: Record<string, string> = {};
    const attrRegex = /([a-zA-Z-]+)="([^"]*)"/g;
    let match;
    while ((match = attrRegex.exec(attrString)) !== null) {
        attributes[match[1]] = match[2];
    }
    return attributes;
}

function parseFromString(html: string): Node {
    const tokens = tokenize(html);
    const root = new Node("document");
    const stack: Node[] = [root];

    for (const token of tokens) {
        if (token.startsWith("</")) {
            // Closing tag, pop the stack
            stack.pop();
        } else if (token.startsWith("<")) {
            // Opening tag
            const tagNameMatch = token.match(/<([a-zA-Z1-6]+)/);
            const tagName = tagNameMatch ? tagNameMatch[1] : "";
            const attributes = parseAttributes(token);
            const element = new Element(tagName, attributes);
            const parent = stack[stack.length - 1];
            parent.children.push(element);
            stack.push(element);
        } else if (token) {
            // Text node
            const textNode = new TextNode(token);
            const parent = stack[stack.length - 1];
            parent.children.push(textNode);
        }
    }

    return root;
}

function matchesSelector(element: Element, selector: string): boolean {
    // Basic support for class selectors
    if (selector.startsWith(".")) {
        const className = selector.substring(1);
        return element.attributes.class &&
            element.attributes.class.includes(className);
    }

    // Basic support for tag selectors
    return element.nodeName === selector;
}

function querySelector(root: Node, selector: string): Element | null {
    if (root instanceof Element && matchesSelector(root, selector)) {
        return root;
    }

    for (const child of root.children) {
        const found = querySelector(child, selector);
        if (found) return found;
    }

    return null;
}

// HTML string to parse
const html = `
  <html>
    <body>
      <div class="header">Hello, Deno!</div>
      <p>This is a custom HTML parser.</p>
    </body>
  </html>
`;

// Parse the HTML string
const document = parseFromString(html);

// Use querySelector to find elements
const header = querySelector(document, ".header");
const paragraph = querySelector(document, "p");

console.log("Document:", document);
console.log("Header content:", header?.children[0].textContent);
console.log("Paragraph content:", paragraph?.children[0].textContent);
