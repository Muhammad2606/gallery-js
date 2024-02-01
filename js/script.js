const parent = document.querySelector('.gallery__content');
let arr = [];

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

            // Set attributes and text content
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

            boxImg.addEventListener('click', () => getImageById(item));

            parent.appendChild(itemBox);
        });
    });
}

function getImageById(item) {
    console.log(item);
}

createItem();
