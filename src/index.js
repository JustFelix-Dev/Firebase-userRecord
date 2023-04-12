import { initializeApp } from 'firebase/app'
import {
    addDoc,
    collection,
     deleteDoc,
     doc,
     getFirestore, 
     onSnapshot, 
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyA2SIN-ukNaYn1y0GdJfepDSH4Nz43HF0k",
    authDomain: "fir-87854.firebaseapp.com",
    projectId: "fir-87854",
    storageBucket: "fir-87854.appspot.com",
    messagingSenderId: "802481049326",
    appId: "1:802481049326:web:8144745f62d10a4b8d2dff"
  };
  initializeApp(firebaseConfig)
  const db = getFirestore()
  const colRef = collection(db,'Users')
  const myList = document.querySelector('.user--list')
    
  
//   Function to create and render
  function renderUsers(docs){
      let li = document.createElement('li');
      let name = document.createElement('span');
      let city = document.createElement('span');
      let del = document.createElement('button');

          var tempId = "Ninja" + docs.id;
         li.setAttribute('data-id',tempId)
          name.textContent = docs.data().name
          city.textContent = docs.data().city
          del.textContent = "x"

          li.appendChild(name)
          li.appendChild(city)
          li.appendChild(del)
          myList.appendChild(li)

              //   Deleting the doc
          del.addEventListener('click',(e)=>{
            e.stopPropagation()
         var tempId = e.target.parentElement.getAttribute('data-id');
          console.log(tempId);
         let id = tempId.slice(5,)
         console.log(id);
            const docRef = doc(db,'Users',id)
               deleteDoc(docRef)
          })

        }
      
        // Getting the docs
    onSnapshot(colRef,(snapshot)=>{
        let changes = snapshot.docChanges()
        changes.forEach((change)=>{
               if(change.type == 'added'){
                renderUsers(change.doc)
               }
               else if(change.type == 'removed'){
                let li = myList.querySelector("[data-id=Ninja"+ change.doc.id + "]");
                myList.removeChild(li);
               }
            }) 
    })
  
        //   Adding the docs
  const addBtn = document.querySelector('.add--user')
  addBtn.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(colRef,{
        name: addBtn.name.value,
        city: addBtn.city.value
    })
    .then(()=>{
        addBtn.reset()
    }).catch((err)=>{
        console.log(err.message)
    })
  })

      

 
  
 
 