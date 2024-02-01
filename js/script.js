const parent = document.querySelector('.gallery__content');
let currentDetailBox = null;

async function getImgData() {
    try {
        const response = await fetch('data/data.json');

        if (!response.ok) {
            throw new Error('Error fetching data');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

function createItem() {
    getImgData().then(data => {
        data.forEach(item => {
            const img = document.createElement('img'),
                p = document.createElement('p'),
                view = document.createElement('span'),
                date = document.createElement('span'),
                itemBox = document.createElement('div'),
                boxImg = document.createElement('div'),
                boxFooter = document.createElement('div');

            img.setAttribute('src', item.image);
            p.textContent = item.title;
            view.textContent = ' views ' + item.views;
            date.textContent = item.date;

            boxImg.appendChild(img);
            boxImg.appendChild(p);
            boxFooter.appendChild(date);
            boxFooter.appendChild(view);
            itemBox.appendChild(boxImg);
            itemBox.appendChild(boxFooter);

            itemBox.classList.add('item');
            boxImg.classList.add('img');
            boxFooter.classList.add('title');

            boxImg.addEventListener('click', () => showImageDetails(item));

            parent.appendChild(itemBox);
        });
    });
}

function showImageDetails(item) {

    if (currentDetailBox) {
        currentDetailBox.remove();
    }
    const detailBox = createDetailBox(item);
    document.body.appendChild(detailBox);

    currentDetailBox = detailBox;
}

function createDetailBox(item) {
    const detailBox = document.createElement('div'),
        imgBox = document.createElement('div'),
        image = document.createElement('img'),
        title = document.createElement('p'),
        views = document.createElement('span'),
        date = document.createElement('span');

    image.setAttribute('src', item.image);
    title.textContent = item.title;
    date.textContent = item.date;
    views.textContent = ' views ' + item.views;

    imgBox.appendChild(image);
    imgBox.appendChild(title);

    detailBox.appendChild(imgBox);
    detailBox.appendChild(date);
    detailBox.appendChild(views);

    detailBox.classList.add('detail-box');
    imgBox.classList.add('img');

    return detailBox;
}

createItem();
