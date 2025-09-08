// All Trees 

const allTrees = ()=>{
    const allCardUrl = "https://openapi.programming-hero.com/api/plants"
    fetch(allCardUrl)
    .then(res => res.json())
    .then(json => displayAllTrees(json.plants));
};

const displayAllTrees = (allCards) =>{
    const allCardContainer = document.getElementById('card-container');
    allCardContainer.innerHTML="";

    allCards.forEach(allCard => {
     const allCardDiv = document.createElement('div')
    allCardDiv.innerHTML = ` 
            <div class=" w-[230px] h-auto p-2.5 rounded-md bg-white space-y-2 ">
                        <img class="w-full  rounded-lg bg-[#EDEDED] " src="${allCard.image}" alt="">
                        <h6 class="font-bold text-[14px]">${allCard.name}</h6>
                        <p class="text-[12px]">${allCard.description}</p>
                        <div class="flex justify-between">
                            <span class=" w-auto h-auto  rounded-3xl text-[16px] text-[#] px-1.5 bg-[#DCFCE7]">${allCard.category}</span>
                            <span class="font-bold">৳${allCard.price}</span>
                        </div>
                        <button class="btn btn-success w-full p-1.5  text-white font-semibold rounded-3xl">Add
                            to
                            Cart</button>
                    </div>
                        
    `
     allCardContainer.append(allCardDiv);
    
   });
};
allTrees();

// All Btns 

const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayBtns(json.categories))
};

const displayBtns = (btns) =>{

    const btnContainer = document.getElementById("btn-container")

    btns.forEach(btn => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick="loadCard(${btn.id})" class="btn btn-soft  btn-success w-full hover:text-white">${btn.category_name} </button>
        `
           btnContainer.append(btnDiv);
    });
   
}
loadCategory()


// Here Load Trees By Category

const loadCard = (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => displayCardsByCategory(json.plants));
};

const displayCardsByCategory = (cards) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML="";

   cards.forEach(card => {
     const cardDiv = document.createElement('div');
    cardDiv.innerHTML = ` 
            <div class=" w-[230px] h-auto p-2.5 rounded-md bg-white space-y-2 ">
                        <img class="w-full  rounded-lg bg-[#EDEDED] " src="${card.image}" alt="">
                        <h6 class="font-bold text-[14px]">${card.name}</h6>
                        <p class="text-[12px]">${card.description}</p>
                        <div class="flex justify-between">
                            <span class=" w-auto h-auto  rounded-3xl text-[16px] text-[#] px-1.5 bg-[#DCFCE7]">${card.category}</span>
                            <span class="font-bold">৳${card.price}</span>
                        </div>
                        <button class="btn btn-success w-full p-1.5  text-white font-semibold rounded-3xl">Add
                            to
                            Cart</button>
                    </div>
                        
    `
    cardContainer.append(cardDiv);
    
   });
};

loadCard();


