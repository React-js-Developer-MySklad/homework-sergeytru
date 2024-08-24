function nodeFromText(text) {
    let templateNode = document.createElement('template');
    templateNode.innerHTML = text;
    let result = templateNode.content.children;
    return result.length === 1 ? result[0] : result;
}

export default nodeFromText;