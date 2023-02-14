//your code here

// selecting container, page number in title, prev button and next button
const container = document.querySelector(".container");
const pageNumber = document.getElementById("pageNumber");
const loadPrev = document.getElementById("load_prev");
const loadNext = document.getElementById("load_next");

// initializng pageNum and setting in the pageNumber
let pageNum = 1;
pageNumber.innerText = pageNum;

async function fetchIssues(pageNum) {
    const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNum}&per_page=5`);
    const data = await response.json();
    // data is an array of issues. So, I'm iterating over all issues and returning the 
    // title only as an array and joining them together as a string
    container.innerHTML = data.map((issue)=> `<li>${issue.title}</li>`).join("");
    // this commented is extra feature. If the page is on first page so don't show the prev button else show it
    // if(pageNum === 1) {
    //     loadPrev.style.display = "none";
    // } else {
    //     loadPrev.style.display = "inline-block";
        
    // }
}
// invoking fetchIssues here for first time initialization
fetchIssues(pageNum);

loadPrev.addEventListener("click", ()=> {
    // if page no is 1 so dont do anything, otherwise decrease pageNum, set pageNum and call fetchIssues with pageNum
    if(pageNum > 1) {
        pageNum--;
        pageNumber.innerText = pageNum;
        fetchIssues(pageNum);
    }
})

loadNext.addEventListener("click", ()=> {
        // simply increasing pageNum, setting page number in page and calling fetchIssues with pageNum
        pageNum++;
        pageNumber.innerText = pageNum;
        fetchIssues(pageNum);
})