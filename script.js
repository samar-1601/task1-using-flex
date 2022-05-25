const leftGrid = document.querySelector(".left-flex");
const rightGrid= document.querySelector(".right-flex");
const listItems = document.querySelector(".list-items");
const rightImageDesc = document.querySelector(".right-image-desc");

var idx = 0; // idx tracks the current list item acccessed

const getLeftAndRightParts = (title)=>{
    // returns the left and right parts for a given text
    let len = title.length;
    let leftText, rightText;

    leftText = title.slice(0,len/2);
    if(len%2==0)
        rightText = title.slice(-len/2);
    else 
        rightText = title.slice(-len/2-1);

    return [leftText, rightText];
}
const addLeftHTMLComponents = (value, id) =>{

    const listItem = document.createElement("li"); // parent li which is made into a grid to contain the image and text

    const listTitle = document.createElement("span"); // parent span containing both the left and right string parts

    const listItemImage = document.createElement("img"); // image of the list-item

    const listItemTextLeft = document.createElement("span"); // left-part of text
    const listItemTextRight = document.createElement("span"); // right-part of text

    listItem.classList.add("list-item");
    listTitle.classList.add("list-item-text")
    listItemTextLeft.classList.add("left-text")
    listItemTextRight.classList.add("right-text")
    listItemImage.classList.add("list-item-image")
    listItemImage.setAttribute("alt", value.title)

    listItem.id = "l" + id.toString(); // assigning the id for each list item to access them later using these

    let [leftText, rightText] = getLeftAndRightParts(value.title);

    // assign the left and right texts to their respective elements
    listItemTextLeft.innerText = leftText; 
    listItemTextRight.innerText = rightText;

    listItemImage.src = value.previewImage;

    // adding the on-click event for the list items
    listItem.addEventListener("click",
        ()=>{
            // global idx is equals the current-element's id
            idx = id;
            toggleRightImage()
        }
    )

    listItem.appendChild(listItemImage);
    listItem.appendChild(listTitle);
    listTitle.appendChild(listItemTextLeft);
    listTitle.appendChild(listItemTextRight);
    listItems.appendChild(listItem);

    // initializing the right pane with the first list-item on left pane
    if(id==0)
        toggleRightImage(listItem,0);
}

let prevListItem;
const toggleRightImage = ()=>{
    // this function toggles the right pane according to the left pane's selected list-item
    const listItem = document.querySelector("#l"+idx);

    // toggling the color for the previous and the currently selected item
    if(prevListItem)
    {
        prevListItem.style.backgroundColor = "";
        prevListItem.style.color = "black";
    }
    listItem.style.backgroundColor = "#015ece";
    listItem.style.color = "white";

    item = itemData[idx];
    const rightImage = document.querySelector(".right-image");
    rightImage.src = item.previewImage;
    
    rightImageDesc.value = item.title;

    // the current item becomes the previous item for the next time toggleRightImage is called
    prevListItem = listItem;
}

const toggleUp = ()=>{
    // toggles the left list-item when up arrow pressed
    // updates idx and calls toggleRightImage 
    idx = (idx>0)?(idx-1):idx;
    toggleRightImage();
}

const toggleDown = ()=>{
    // toggles the left list-item when down arrow pressed
    // updates idx and calls toggleRightImage  
    idx = (idx===(itemData.length-1))?idx:(idx+1);
    toggleRightImage();
}

const updateDescription = (updatedDesc)=>{
    
    const listItem = document.querySelector("#l"+idx);
    
    //update the itemData title so it remains same for future references
    itemData[idx].title = updatedDesc;
    const listItemTextLeft = listItem.querySelector(".left-text");
    const listItemTextRight = listItem.querySelector(".right-text");

    let [leftText, rightText] = getLeftAndRightParts(updatedDesc);
    // updating the title for the left-pane list items
    listItemTextLeft.innerText = leftText;
    listItemTextRight.innerText = rightText;

}

function mainFunc(){
    
    // initialize left pane list items
    itemData.forEach((value, index) => {
        addLeftHTMLComponents(value, index)
    });

    // handle the up and down arrow presses
    document.onkeydown = function(e) {
        console.log("presss")
        switch (e.key) {
            case "ArrowDown":
                toggleDown();
                break;
            case "ArrowUp":
                toggleUp();
                break;
        }
    };

    // right pane title change is handeled here based on the global "idx" value
    rightImageDesc.addEventListener("input", (e)=>{
        updateDescription(rightImageDesc.value)
    })
}

// fetch data from the JSON file
let itemData;
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
      itemData = data;
      mainFunc();
    })
  .catch(error => console.log(error));

