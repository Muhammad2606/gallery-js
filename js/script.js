const parent = document.querySelector(".gallery__content");
let currentDetailBox = null;

async function getImgData() {
    try {
        const response = await fetch("data/data.json");

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

function createItem() {
    getImgData().then((data) => {
        data.forEach((item, index) => {
            const img = document.createElement("img"),
                p = document.createElement("p"),
                view = document.createElement("span"),
                date = document.createElement("span"),
                itemBox = document.createElement("div"),
                boxImg = document.createElement("div"),
                boxFooter = document.createElement("div");

            img.setAttribute("src", item.image);
            p.textContent = item.title;
            view.textContent = " views " + item.views;
            date.textContent = item.date;

            boxImg.appendChild(img);
            boxImg.appendChild(p);
            boxFooter.appendChild(date);
            boxFooter.appendChild(view);
            itemBox.appendChild(boxImg);
            itemBox.appendChild(boxFooter);

            itemBox.classList.add('item');
            boxImg.classList.add('img', 'loader');
            boxFooter.classList.add('title');
            view.style.opacity = 0
            date.style.opacity = 0
            img.addEventListener('load', () => {
                boxImg.classList.remove('loader');
                view.style.opacity = 1
                date.style.opacity = 1
            });

            boxImg.addEventListener('click', () => showImageDetails(item));

            parent.appendChild(itemBox);

            // Add data-item-index attribute for event delegation
            itemBox.dataset.itemIndex = index;
        });

        // Event delegation for item click
        parent.addEventListener("click", (event) => {
            const target = event.target;
            const itemIndex = target.closest(".item")?.dataset.itemIndex;

            if (itemIndex !== undefined) {
                const item = data[itemIndex];
                showImageDetails(item);
            }
        });
    });
}

function showImageDetails(item) {
    if (currentDetailBox) {
        currentDetailBox.classList.add("closed");

        currentDetailBox.remove();

    }

    const detailBox = createDetailBox(item);
    document.body.appendChild(detailBox);
    currentDetailBox = detailBox;
}

function createDetailBox(item) {
    const detailBox = document.createElement("div"),
        imgBox = document.createElement("div"),
        image = document.createElement("img"),
        title = document.createElement("p"),
        views = document.createElement("span"),
        date = document.createElement("span");

    image.setAttribute("src", item.image);
    title.textContent = item.title;
    date.textContent = item.date;
    views.textContent = " views " + item.views;

    imgBox.appendChild(image);
    detailBox.appendChild(imgBox);

    detailBox.classList.add("detail__box");
    imgBox.classList.add("img");

    detailBox.addEventListener('click', () => {
        detailBox.classList.add('closed');

        detailBox.remove();

    });

    return detailBox;
}

createItem();