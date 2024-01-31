const parent = document.querySelector('.gallery__content');

async function getImgData() {
    try {
        const data = await fetch('data/data.json')
        if(!data.ok){
            throw new Error('xattolik bor')
            
        }
        return data.json()
    } catch (error) {
        console.log(error);
    }
}



function createItem(){
    
    
    getImgData().then(data  => {
        data.map(item => {
            const img = document.createElement('img'),
            p = document.createElement('p'),
            view = document.createElement('span'),
            date = document.createElement('span'),
            itemBox = document.createElement('div'),
            boxImg = document.createElement('div'),
            boxFooter = document.createElement('div');
            img.setAttribute('src', item.image)
            p.textContent = item.title
            view.textContent = ' views ' + item.views 
            date.textContent = item.date
            boxImg.appendChild(img)
           boxImg.appendChild(p)
            boxFooter.appendChild(date)
            boxFooter.appendChild(view)
            itemBox.appendChild(boxImg)
            itemBox.appendChild(boxFooter)
            parent.appendChild(itemBox)
            itemBox.classList.add('item')
            boxImg.classList.add('img')
            boxFooter.classList.add('title')

        })
        
    })
}

createItem()