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

function parseFromString(html: string, skipTags: string[] = []): Node {
    const tokens = tokenize(html);
    const root = new Node("document");
    const stack: Node[] = [root];
    let skipTagStack: string | null = null; // To track skipping nested tags

    for (const token of tokens) {
        if (skipTagStack && token.startsWith(`</${skipTagStack}`)) {
            // Found the closing tag of the currently skipped tag
            skipTagStack = null; // Stop skipping
            continue;
        }

        if (skipTagStack) {
            // We're in a skipped tag (like <script> or <head>), so skip everything
            continue;
        }

        if (token.startsWith("</")) {
            // Closing tag, pop the stack
            stack.pop();
        } else if (token.startsWith("<")) {
            // Opening tag
            const tagNameMatch = token.match(/<([a-zA-Z1-6]+)/);
            const tagName = tagNameMatch ? tagNameMatch[1] : "";

            if (skipTags.includes(tagName)) {
                skipTagStack = tagName; // Start skipping this tag
                continue;
            }

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
        if (
            element.attributes.class &&
            element.attributes.class.includes(className)
        ) {
            return true;
        }
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

const filePath = "/home/sankar/projects/loony-js/etmoney.html";
const content = Deno.readTextFileSync(filePath);
// const content = `
//     <div>
//       <h1>Hello, World!</h1>
//     </div>
//     <div>
//       <p>This is a paragraph.</p>
//     </div>
// `;

// Parse the HTML string
const document = parseFromString(content, ["script", "head", "header"]);
console.log(JSON.stringify(document));
