document.querySelector('.demonName').addEventListener('click', displayName)

///My API fetch was working just fine, but the button was not working. When it was just a test that put text in the DOM, the text would go in the DOM but it would just flash there

//I think I need some kind of async function attached to my button event listener to make this work

//after I figure that out, I need to review how to integrate images that should exist within my dataset with some form of online storage like S3

//The CSS happeend to work because i hadn't put it in a folder. I just need to learn how to set static paths up in my server.js in case I want to use sub-folders in my public folder

// function displayName() {
//     console.log('test')
//     const demon = document.querySelector('.demonName').value
//     fetch('https://magick-api.herokuapp.com/api')
//         .then(res => res.json())
//         .then(data => {
//         for (let obj in data) {
//             if (obj.name === demon) {
//                 console.log('success')
//             }
//         }
           
//         })
//         .catch(err => console.log(`error ${err}`))

// }

// async function displayName() {
//     try {
//         console.log('test')
//         const response = await(fetch('https://magick-api.herokuapp.com/api'))
//         const data = await response.json()
//         console.log(data)
//         document.querySelector('.test-name-space').innerText = 'hello'
//     }
//     catch(err) {
//         console.log(err)
//     }
// }
function displayName() {
    fetch('https://magick-api.herokuapp.com/api')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(`error ${err}`))
}


// async function displayName() {
//     try {
//         const response = await fetch('https://magick-api.herokuapp.com/api')
//         const data = await response.json()
//         console.log(data)
//     }
//     catch(err) {
//         console.log(err)
//     }

// }

// displayName()

// fetch('https://pokeapi.co/api/v2/type/')
// .then(res => res.json()) // parse response as JSON
// .then(data => {
//   let typesArr = []
//   let endy = data['results'].length
//   const typeObj = data['results']
//   // const newArr = Object.values(typeObj)
//   // const newArr2 = newArr[0]['name']
//   // console.log(newArr2)
//   for (let i=0; i<endy; i++) {
//     console.log(data['results'][i]['name'])
//     typesArr.push(data['results'][i]['name'])
//   }
//   console.log(typesArr)
//   for (let i=0; i<typesArr.length; i++) {
//     const option = document.createElement('option')
//     option.value = typesArr[i]
//     option.innerText = typesArr[i]
//     select.appendChild(option)
//   }
  
  
// })
// .catch(err => {
//     console.log(`error ${err}`)
// });
