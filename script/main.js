// by default
document.getElementById("All-btn").classList.add("btn-hover");
const btnAll = document.getElementById("All-btn");
const btnOpen = document.getElementById("Open-btn");
const btnClose = document.getElementById("Close-btn");
//search part
const SearchInput = document.getElementById("search-input");
const SearchButton = document.getElementById("search-btn");
SearchButton.addEventListener("click", () => {
    searchDetails();
});

// array
let allIssues = [];

const loadAllCard = async () => {
    spinner(true);
    setTimeout(async () => {
        const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
        const res = await fetch(url);
        const json = await res.json();
        allIssues = json.data
        displayAllCard(allIssues);
        spinner(false);
    }, 500); // 50ms is enough
    // displayStatus(allIssues);
    // openButton.addEventListener("click", loadOpenCard(data.id));
    // Event Listeners for Filtering
    document.getElementById("All-btn").addEventListener("click", async () => {
        spinner(true);
        await new Promise(time => setTimeout(time, 500));
        displayAllCard(allIssues);
        const btn = document.getElementById("All-btn");
        btnAll.classList.add("btn-hover");
        btnOpen.classList.remove("btn-hover");
        btnClose.classList.remove("btn-hover");
        spinner(false)

    });

    document.getElementById("Open-btn").addEventListener("click", async () => {
        spinner(true);
        await new Promise(time => setTimeout(time, 500));

        const openIssues = allIssues.filter(issue => issue.status === "open");
        displayAllCard(openIssues);
        btnOpen.classList.add("btn-hover");
        btnAll.classList.remove("btn-hover");
        btnClose.classList.remove("btn-hover");

        spinner(false)
    });

    document.getElementById("Close-btn").addEventListener("click", async () => {
        spinner(true);
        await new Promise(time => setTimeout(time, 500));

        const closedIssues = allIssues.filter(issue => issue.status === "closed");
        displayAllCard(closedIssues);
        btnClose.classList.add("btn-hover");
        btnAll.classList.remove("btn-hover");
        btnOpen.classList.remove("btn-hover");

        spinner(false)
    });


}
const loadEachCardDetail = (id) => {
    displayEachCardDetail(id);
}

const spinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-info").classList.add("hidden");
    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("card-info").classList.remove("hidden");
    }
}
const searchDetails = async () => {
    const searchValue = SearchInput.value;
    // searchValue.classList.add("bg-yellow-200")
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    const res = await fetch(url);
    const json = await res.json();
    console.log(json.data);

    displayAllCard(json.data)
}

const displayEachCardDetail = (details) => {
    //  console.log(details)

    // condition check before creating html part
    // 1 no condition
    const assignName = details.assignee === "" ? "Unassigned" : details.assignee
    // 2 no condition
    const labelStatus = details.labels[1] ? details.labels[1] : "";

    document.getElementById("my_modal_5").showModal();
    

    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML = `
                <h1 class="text-2xl font-bold">${details.title}</h1>
                <div class="flex space-x-3 mb-4">
                    <div class="border bg-[#00A96E] text-white rounded-2xl px-3 py-1 text-xs text-center detail-status"></div>
                    <div class="flex items-center gap-1">
                        <div class="w-1 h-1 rounded-full bg-[#515453] "></div>
                        <p class="text-xs text-[#64748B]">Opened by ${details.author}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <div class="w-1 h-1 rounded-full bg-[#64748B] "></div>
                        <p class="text-xs text-[#64748B]">${details.createdAt.split('T')[0]}</p>
                    </div>

                </div>
                <div class="bug-part flex items-center gap-2 mb-5">
                    <div class="flex items-center gap-1 bg-[#FECACA] text-[#EF4444] border border-[#EF4444] rounded-2xl px-3 py-1 uppercase">
                        <img src="assets/Vector.png" class="w-3 h-3" alt="">
                        <p class="font-semibold text-xs">${details.labels[0]}</p>
                    </div>
                    <div class="label-one flex items-center gap-1 border border-[#D97706] bg-[#FFF6D1] text-[#D97706] rounded-2xl px-3 py-1 uppercase">
                        <img src="assets/Lifebuoy.png" class="w-3 h-3" alt="">
                        <p class="font-semibold text-xs">${labelStatus}</p>
                    </div>
                </div>
                <p class="text-[#64748B] mb-10">${details.description}</p>
                <div class="flex justify-start">
                    <div class="flex-1">
                        <p class="text-[#64748B]">Assignee:</p> 
                        <p class="font-bold">${details.author}</p>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#64748B]">Priority:</p>
                        <p class="border rounded-xl text-xs px-3 py-1 bg-[#EF4444] text-white inline-block text-center">${details.priority}</p>
                    </div>
                </div>

`
    const labelOneRemove = detailBox.querySelector(".label-one");
    const detailsStatusAlter = detailBox.querySelector(".detail-status");
    if (!details.labels[1]) {
        labelOneRemove.classList.add("hidden")
    }
    // check-2
    if (details.status === "open") {
        detailsStatusAlter.innerHTML = `Opened`;
    }
    else if (details.status === "closed") {
        detailsStatusAlter.innerHTML = `Closed`;
    }

}

const displayStatus = (statusImage, statusValue, cardDiv) => {
    const openState = statusImage.querySelector(".active-open");
    const closeState = statusImage.querySelector(".active-close");

    if (statusValue === "open") {
        cardDiv.classList.add("card-border-open");
        openState.classList.remove("hidden");
        closeState.classList.add("hidden")
    }
    else {
        cardDiv.classList.add("card-border-close");
        closeState.classList.remove("hidden");
        openState.classList.add("hidden")
    }

}

const displayAllCard = (id) => {
    let cardNo = 0;
    // 1. getting id
    const cardInfo = document.getElementById("card-info");
    cardInfo.innerHTML = "";
    // add border top
    // card-info.classList.add("card-border-open");
    for (let card of id) {
        console.log(card);
        cardNo++;
        // condition check before creating html part
        // 1 no condition
        const assignName = card.assignee === "" ? "Unassigned" : card.assignee
        // 2 no condition
        const labelStatus = card.labels[1] ? card.labels[1] : "";


        // 2. creating element
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="shadow-sm rounded-2xl h-full" id="single-card">
                <section class=" border-b-2 border-b-gray-200  ">
                <div class="py-3  mt-4 p-4 space-y-4">
                    <div class="flex justify-between">
                        <div class= "flex status-img" >
                            <img class="active-close" src="assets/Closed-Status .png" alt="">
                            <img class="active-open" src="assets/Open-Status.png" alt="">
                        </div>
                        <div class="bug-priority">
                            <p class="border  rounded-2xl px-3  uppercase text-xs font-bold">${card.priority}</p>
                        </div>

                    </div>
                    <div class="card-text">
                        <div class = "min-h-14">
                        <h1 class="font-semibold">${card.title}</h1>
                        </div>
                        <div class = "min-h-14 md:min-h-10">
                        <p class="text-[#64748B] text-xs">${card.description}</p>
                        </div>
                    </div>
                    <div class="bug-part flex flex-col md:flex-row items-center gap-1 mb-2 min-h-12 md:min-h-10 lg:min-h-9">
                        <div class="flex items-center gap-1 border border-red-400 bg-[#FECACA]  rounded-2xl px-4 md:pl-3 py-1">
                            <img src="assets/Vector.png" class="w-3 h-3" alt="">
                            <p class="text-red-400 font-semibold text-xs text-center uppercase">${card.labels[0]}</p>
                        </div>
                        <div class="label-one flex items-center gap-1 border border-[#D97706] bg-[#FFF6D1] rounded-2xl px-4 md:pl-2 py-1">
                            <img src="assets/Lifebuoy.png" class="w-3 h-3" alt="">
                            <p class="text-[#D97706] font-semibold text-xs text-center uppercase">${labelStatus}</p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="p-4 space-y-2 mt-4">
                 <div class="flex justify-between items-center gap-4">
                    <p class="text-xs text-[#64748B]">#${card.id} ${card.author}</p>
                    <p class="text-xs text-[#64748B]">${card.createdAt.split('T')[0]}</p>
                </div>
                <div class="flex justify-between items-center gap-4">
                    <p class="text-xs text-[#64748B]">Assignee : ${assignName}</p>
                    <p class="text-xs text-[#64748B]">${card.updatedAt.split('T')[0]}</p>
                </div>
            </div>
            </div>
        `
        // status image related
        const statusImage = cardDiv.querySelector(".status-img");
        displayStatus(statusImage, card.status, cardDiv);
        //label part 
        const labelOneRemove = cardDiv.querySelector(".label-one");
        if (!card.labels[1]) {
            labelOneRemove.classList.add("hidden")
        }
        // creating onclick event listener on card
        cardDiv.addEventListener("click", () => {
            loadEachCardDetail(card);
        })

        // high-medium-low design
        const cardPriority = cardDiv.querySelector(".bug-priority p");
        if (card.priority.toLowerCase() === 'high') {
            cardPriority.classList.add("high-design")
        }
        else if (card.priority.toLowerCase() === 'medium') {
            cardPriority.classList.add("medium-design")
        }
        else {
            cardPriority.classList.add("low-design")
        }

        // 3. appending 
        cardInfo.append(cardDiv);

    }

    const cardSpan = document.getElementById("card-number");
    cardSpan.innerHTML = cardNo;

}
loadAllCard()
