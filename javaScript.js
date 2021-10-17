
const clickPageNumber = document.querySelectorAll('.clickPageNumber'),
    prevButton = document.getElementById('button_prev'),
    nextButton = document.getElementById('button_next'),
    sortByNameBtn = document.getElementById('sortByName'),
    sortByOddId = document.getElementById('sortByOddId'),
    sortByEvenId=  document.getElementById('sortByEvenId'),
    pgNumbers = document.getElementById('pgNumbers');
    select = document.querySelector('select'),
    alphaBtn = document.querySelector("#alphabetBtn")


    
    
let currentPage = 1;



prevButton.addEventListener('click', prevPage);
nextButton.addEventListener('click', nextPage);
sortByNameBtn.addEventListener('click',sortByName)
sortByOddId.addEventListener('click',sortByOdd);
sortByEvenId.addEventListener('click',sortByEven);
alphaBtn.addEventListener('click',searchByFirstLetter);




async function fetched(){
    const response = await fetch('https://reqres.in/api/users')
    const info =await response.json()
    fetchedData=  await info.data
    // console.log(fetchedData)
    return fetchedData  
}

select.onchange = tableSize;
function tableSize(e){
    let recordsPerPage= parseInt(e.target.value)
    console.log(recordsPerPage)
    changePage(1,recordsPerPage)
    paginationBtnDisplay(recordsPerPage) 
}


async function paginationBtnDisplay(recordsPerPage){
    fetchedData = await fetched()
    const totalRows = fetchedData.length
    if(totalRows<=recordsPerPage){
        document.getElementById('pgSetup').style.display='none';
    }
    else{
        document.getElementById('pgSetup').style.display='flex';
        numOfPages(recordsPerPage)
        
    }
}

function selectedPage() {
    let pageNumber = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
    for (let i = 0; i < pageNumber.length; i++) {
        if (i == currentPage - 1) {
            pageNumber[i].style.opacity = "1.0";
        } 
        else {
            pageNumber[i].style.opacity = "0.5";
        }
    }   
}  

async function checkButtonOpacity() {
    let pg= await numOfPages()
  currentPage == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
  currentPage == pg ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
}



changePage(1,3)

async function changePage(page,recordsPerPage) {
    fetchedData = await fetched()
    const listingTable = document.getElementById('listingTable');

    if (page < 1) {
        page = 1;
    } 
    if (page > (numOfPages() -1)) {
        page = numOfPages();
    }
   let temp = "";
   for(var i = (page -1) * recordsPerPage; i < (page * recordsPerPage) && i < fetchedData.length; i++) {
      temp += `<tr class="row">
                  <td>${fetchedData[i].id}</td>
                  <td>${fetchedData[i].email}</td>
                  <td>${fetchedData[i].first_name}</td>
                  <td>${fetchedData[i].last_name}</td>
                  <td class="avatar"><img src="${fetchedData[i].avatar}"></td>
              </tr>`        
      listingTable.innerHTML = temp;
    } 
    checkButtonOpacity();
    selectedPage();  
}


async function prevPage() {
    pg= await numOfPages()
    if(currentPage > 1) {
        currentPage--;
        
        changePage(currentPage,recordsPerPage);
    }
    pgNumbers.innerHTML=`${currentPage} of ${pg} pages`
    
   
}

async function nextPage() {
    let pg = await numOfPages()
    console.log(pg)
    if(currentPage < pg) {
        currentPage++;
        changePage(currentPage,recordsPerPage);
    } 
    pgNumbers.innerHTML=`${currentPage} of ${pg} pages`
}

async function clickOnPage() {
    let pg = await numOfPages()
    pgNumbers.innerHTML=`1 of ${pg} pages`
    document.addEventListener('click', function(e) {
        if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
            currentPage = e.target.textContent;
            console.log(currentPage)
            changePage(currentPage,recordsPerPage);
            pgNumbers.innerHTML=`${e.target.textContent} of ${pg} pages`
        }
        
    });
}

async function pageNumbers() {
    let pg = await numOfPages()
    let pageNumber = document.getElementById('page_number');
        pageNumber.innerHTML = "";

    for(let i = 1; i < pg + 1; i++) {
        pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
    }
}

async function numOfPages() {
    recordsPerPage=3
    fetchedData = await fetched()
    // console.log(fetchedData.length)
    return Math.ceil(fetchedData.length / recordsPerPage);  
}
pageNumbers()
clickOnPage()


async function sortByEven(){
    console.log('even')
    const EvenIdInfo=[];
    let temp='';
    fetchedData = await fetched()
    
    fetchedData.filter(function(item){
        if(item.id %2==0){
            EvenIdInfo.push(item)
                } 
    })
    for(let i=0;i<EvenIdInfo.length;i++){
        temp += `<tr class="row">
                    <td>${EvenIdInfo[i].id}</td>
                    <td>${EvenIdInfo[i].email}</td>
                    <td>${EvenIdInfo[i].first_name}</td>
                    <td>${EvenIdInfo[i].last_name}</td>
                    <td class="avatar"><img src="${EvenIdInfo[i].avatar}"></td>
                </tr>` 
    }       
    listingTable.innerHTML = temp;      
}


async function sortByOdd(){
    console.log('odd')
    const OddIdInfo=[];
    let temp='';
    fetchedData = await fetched()
    
    fetchedData.filter(function(item){
        if(item.id %2==0){
            OddIdInfo.push(item)
                } 
    })
    for(let i=0;i<OddIdInfo.length;i++){
        temp += `<tr class="row">
                    <td>${OddIdInfo[i].id}</td>
                    <td>${OddIdInfo[i].email}</td>
                    <td>${OddIdInfo[i].first_name}</td>
                    <td>${OddIdInfo[i].last_name}</td>
                    <td class="avatar"><img src="${OddIdInfo[i].avatar}"></td>
                </tr>` 
    }       
    listingTable.innerHTML = temp;      
}

function sortByName(){
    console.log('hello name')
    let table, rows, switching, i, rowOne,rowTwo , doSwitch,order,count=0;
            table = document.getElementById('table');
            switching = true;
            order = "ascend"
            while(switching){
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    doSwitch = false;
                    // console.log(' sort working')
                    rowOne = rows[i].getElementsByTagName('TD')[1];
                    rowTwo = rows[i + 1].getElementsByTagName('TD')[1];
                    if(order=="ascend"){
                        if (rowOne.innerHTML.toLowerCase() > rowTwo.innerHTML.toLowerCase()) {
                            doSwitch = true;
                            break;
                        }
                    }
                    else if(order=="descend"){
                        if (rowOne.innerHTML.toLowerCase() < rowTwo.innerHTML.toLowerCase()) {
                            doSwitch = true;
                            break;
                        }
                    }
                }
                if (doSwitch){
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                     count++;
                }else{
                    if(count==0 && order=="ascend"){
                        order="descend";
                        switching=true;
                    }
            }    }
}



async function searchByFirstLetter(e){
    fetchedData= await fetched()
    let text,
        result =[],
        temp='',
        len = fetchedData.length;
    const listingtable = document.getElementById('listingTable');   
     
    if(e.target.tagName=='A') text = e.target.textContent 
    console.log(text)
    
    for(let i=0; i<len;i++){
        if (fetchedData[i].first_name.indexOf(text) == 0) result.push(fetchedData[i]);
    }
    console.log(result);
    if(result && !result.length){
        console.log('no data')
        temp+=`<div class="message">Search not found</div>`; 
        // document.getElementById('tbody').style.visibility='hidden'
        
    }
    else{
        console.log('yes data')
        for(let i=0;i<result.length;i++){
            temp += `<tr class="row">
                        <td>${result[i].id}</td>
                        <td>${result[i].email}</td>
                        <td>${result[i].first_name}</td>
                        <td>${result[i].last_name}</td>
                        <td class="avatar"><img src="${result[i].avatar}"></td>
                    </tr>` 
        } 
        // document.getElementById('tbody').style.visibility='visible'
    } 
    listingtable.innerHTML = temp;  
    document.getElementById('pgSetup').style.display ='none';  
}
