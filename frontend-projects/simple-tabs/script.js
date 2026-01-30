const TABS = document.querySelectorAll(".tab");
const TAB_CONTENTS = document.querySelectorAll(".tab-content");

function openTab(tabName) {
    const tab = document.getElementById(`tab-${tabName}`);
    const content = document.getElementById(`${tabName}-content`);
    
    TAB_CONTENTS.forEach((div) => {
        div.dataset.display = "none";
    })
    TABS.forEach((div) => {
        div.classList.remove("current");
    })
    
    tab.classList.add("current");
    content.dataset.display = "flex";
    updateContents();
}

function updateContents() {
    TAB_CONTENTS.forEach((div) => {
        const displayStatus = div.dataset.display;
        div.style.display = displayStatus;
    }) 
}

updateContents();