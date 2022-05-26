function getCssStyle(element, prop) {
    // Function to get the desired style of the font
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFontSize(element) {
    // This function return style of a given element
    const fontWeight = getCssStyle(element, 'font-weight');
    const fontSize = getCssStyle(element, 'font-size');
    const fontFamily = getCssStyle(element, 'font-family');
    
    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

// function to return the width of font
function getTextWidth(text, font) 
{
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

// used to truncate long sentences 
export function truncateMiddle(word,listItemText) 
{
    // Total element width
    const elementWidth = Number((getComputedStyle(listItemText).width).replace("px",""));  
    
    // Width of font according to font size and style
    const fontWidth = getTextWidth(word, getCanvasFontSize(listItemText));
    console.log(`font width : ${fontWidth}`);
    
    // maximum caharacter count which can be placed
    const maxCharacters=(word.length * elementWidth / fontWidth);
    console.log(`maxCharacters: ${maxCharacters}`);

    
    if (word.length < maxCharacters) 
    {
        return word;
    }

    const ellipsis = '...';
    const stringLengthOnBothSides = Math.floor(maxCharacters / 2) - ellipsis.length;
    const truncatedWord = word.slice(0, stringLengthOnBothSides) + ellipsis + word.slice(-stringLengthOnBothSides);
    
    return truncatedWord;
} 
