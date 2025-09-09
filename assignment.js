// All Trees 
const allTrees = () => {
    const allCardUrl = "https://openapi.programming-hero.com/api/plants"
    fetch(allCardUrl)
        .then(res => res.json())
        .then(json => displayAllTrees(json.plants));
};

const displayAllTrees = (allCards) => {
    const allCardContainer = document.getElementById('card-container');
    allCardContainer.innerHTML = "";

    allCards.forEach(allCard => {
        const allCardDiv = document.createElement('div')
        allCardDiv.innerHTML = ` 
            <div class=" w-[230px] h-auto p-2.5 rounded-md bg-white space-y-2 ">
                        <img onclick="ClickedForModals(${allCard.id})" class="w-full  rounded-lg bg-[#EDEDED] " src="${allCard.image}" alt="">
                        <h6 class="font-bold text-[14px]">${allCard.name}</h6>
                        <p class="text-[12px]">${allCard.description}</p>
                        <div class="flex justify-between">
                            <span class=" w-auto h-auto  rounded-3xl text-[16px] text-[#] px-1.5 bg-[#DCFCE7]">${allCard.category}</span>
                            <span class="font-bold">৳${allCard.price}</span>
                        </div>
                        <button id="cart-${allCard.id}" onclick="addToCart(${allCard.id})" class="btn btn-success w-full p-1.5  text-white font-semibold rounded-3xl">Add
                            to
                            Cart</button>
                    </div>
                        
    `
        allCardContainer.append(allCardDiv);
    });
};

allTrees();

// All Btns 

const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayBtnsByCategory(json.categories))
};

const displayBtnsByCategory = (btns) => {
    const btnContainer = document.getElementById("btn-container");

    btns.forEach(btn => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="btn-${btn.id}" onclick="loadCard(${btn.id})" class="btn btn-soft btn-success w-full hover:text-white">${btn.category_name} </button>
        `
        btnContainer.appendChild(btnDiv);
    });
};

loadCategory();

// Here Load Trees By Category

const removeActive = () => {
    const noneActive = document.querySelectorAll('.btn-soft');
    noneActive.forEach((btn) => btn.classList.remove("active"));
};

const loadCard = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickBtn = document.getElementById(`btn-${id}`);
            clickBtn.classList.add("active");
            displayCardsByCategory(json.plants);
        });
};

const displayCardsByCategory = (cards) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = ` 
                    <div class=" w-[230px] h-auto p-2.5 rounded-md bg-white space-y-2 ">
                        <img onclick="ClickedForModals(${card.id})"  class="w-full  rounded-lg bg-[#EDEDED] " src="${card.image}" alt="">
                        <h6 class="font-bold text-[14px]">${card.name}</h6>
                        <p class="text-[12px]">${card.description}</p>
                        <div class="flex justify-between">
                            <span class=" w-auto h-auto  rounded-3xl text-[16px] text-[#] px-1.5 bg-[#DCFCE7]">${card.category}</span>
                            <span class="font-bold">৳${card.price}</span>
                        </div>
                        <button id="cart-${card.id}" onclick="addToCart(${card.id})" class="btn btn-success w-full p-1.5  text-white font-semibold rounded-3xl">Add to Cart</button>
                    </div>
                        
    `
        cardContainer.appendChild(cardDiv);

    });
};

loadCard();

// Your cart 

const addToCart = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            cartItems.push(json.plants);
            allCarts(cartItems);
        });
};
const allCarts = (carts) => {
    const cartContainer = document.getElementById('cart-container')
    cartContainer.innerHTML = "";

    carts.forEach(cart => {
        const cartDiv = document.createElement('div');
        cartDiv.innerHTML = `
                        <div
                            class="btn-clear lg:w-[170px] h-auto mx-auto bg-[#DCFCE780] rounded-xl flex justify-between items-center p-2">
                            <div>
                                <p class="font-semibold">${cart.name} </p>
                                <span class="text-gray-600">৳${cart.price}x 1</span>
                            </div>
                            <button onclick="remove(${cart.id})" id="clear-${cart.id}" class="btn btn-circle"><i class="fa-solid fa-xmark"></i></button>
                        </div>
        `
        cartContainer.appendChild(cartDiv).add;

        let total = 0;
        cartItems.forEach(cart => {
            total += cart.price;
            const totalPrice = document.getElementById('total-price');
            totalPrice.innerText = total;
        })
    });


};

let cartItems = [];
const remove = (removeId) => {
    cartItems = cartItems.filter(item => item.id !== removeId);
    allCarts(cartItems);
};

// Modal function 

const ClickedForModals = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayModals([json.plants]))
}
const displayModals = (modals) => {
    console.log(modals)
    const modalContainer = document.getElementById('modal-container');

    modals.forEach(modal => {
        modalContainer.innerHTML = `
                    <div class = "space-y-4">
                        <h3 span class ="font-bold  text-xl">${modal.name}</h3>
                        <img class ="w-full h-[300px] rounded-xl" src="${modal.image}" alt="">
                        <h4><span class ="font-bold  text-xl" >Category: </span>${modal.category}</h4>
                        <h4><span class ="font-bold  text-xl" >Price: ৳</span>${modal.price}</h4>
                        <p class="py-4"><span class ="font-bold  text-xl" >Description: </span>${modal.description}</p>
                    </div>
    `;
        document.getElementById('my_modal_2').showModal();
    });
};
