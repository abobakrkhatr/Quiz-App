// https://opentdb.com/api.php?amount=6&category=25&difficulty=easy

let quizCategories = document.querySelector('#categories');
let quizDifficult = document.querySelector('#difficult');
let quizNumber = document.querySelector('#quizNumber');
let startQuizBtn = document.querySelector('#startQuizBtn');
let myDiv = document.querySelector('#myDiv');
let changeNumberValue = document.querySelector('#changeNumberValue');
let index = 0;
let quizIndex = 0;
let lengthOfData = [];
let score = 0

startQuizBtn.addEventListener('click', function () {
  let quizValues = {
    cate: quizCategories.value,
    diff: quizDifficult.value,
    num: quizNumber.value,
  }
  getQuizApi(quizValues)
})

async function getQuizApi(quizValues) {
  let response = await fetch(`https://opentdb.com/api.php?amount=${quizValues.num}&category=${quizValues.cate}&difficulty=${quizValues.diff}`)
  let data = await response.json()
  lengthOfData = data.results
  displayQuestion(data.results[quizIndex], lengthOfData)
  // console.log(data.results);
}

function displayQuestion(data, lengthOfData) {
  let quiz = [data]
  // console.log(quiz);
  let allAnswers = [quiz[0].correct_answer, ...quiz[0].incorrect_answers]
  allAnswers.sort()
  let box = '';
  box = `
    <div class="flex flex-col w-full text-white bg-sky-500 p-5 rounded-lg">
      <div class="flex justify-between items-center ">
        <p class="text-2xl">${quiz[0].category}</p>
        <p class="text-xl">${index + 1} of ${lengthOfData.length}</p>
      </div>
      <h2 class="text-xl my-5">${quiz[0].question}</h2>
      <div class='p-5'>
      <ul id='list' class='flex flex-wrap gap-y-2 justify-evenly'>
      ${allAnswers.map((ele) =>
    `<li class='w-2/5 p-2 bg-slate-400 rounded-lg hover:tracking-[.10em] duration-500 cursor-pointer'>${ele}</li>`
  ).join(' ')}
      </ul>
      </div>
      <p class='text-xl text-center mt-5'>Score : <span class='text2xl font-semibold'>${score}</span></p>
    </div>
    `
  myDiv.innerHTML = box;
  nextQuestion(quiz)
}

function nextQuestion(quiz) {
  let choices = document.querySelectorAll('#list li')
  choices.forEach(function (ele) {
    return ele.addEventListener('click', function () {
      quizIndex++
      index++

      if (ele.innerHTML == [quiz[0].correct_answer]) {
        ele.classList.replace('bg-slate-400', 'bg-emerald-600')
        score++
      } else {
        ele.classList.replace('bg-slate-400', 'bg-red-500')
      }

      if (index < lengthOfData.length) {
        setTimeout(() => {
          displayQuestion(lengthOfData[quizIndex], lengthOfData)
        }, 1000)
      } else {
        displayScore()
      }
    })
  });
}

function displayScore() {
  let box = `
  <div class='flex flex-col justify-center items-center w-full text-white bg-sky-500 p-5 rounded-lg text-center text-2xl'><h2>${(score == lengthOfData.length) ? 'Great 😍 Yot Got All, ' : 'Ops, 😌 '} your score is ${score} of ${lengthOfData.length}</h2>
  <buttun onclick='returnToForm()' class='p-2 rounded bg-yellow-400 w-1/5 mt-5 hover:tracking-wider duration-500 cursor-pointer'>Try Again</button>
  </div>
  `
  myDiv.innerHTML = box
}

function returnToForm() {
  window.location.reload();
}

changeNumberValue.addEventListener('click', function () {
  quizNumber.value = Math.round(Math.random() * 50)
})


// let x = [{}, {}]
// console.log(typeof x);
// console.log(Array.isArray(x))

let arr = [
  { id: 1, name: 'abdo' },
  { id: 2, name: 'mariam' },
  { id: 1, name: 'abdo' },
  { id: 1, name: 'abdo' },
  { id: 4, name: 'abdo' },
  { id: 3, name: 'abdo' },
]

let seen = new Set()
let finalArr = arr.filter((obj) => {
  let ids = seen.has(obj.id);
  seen.add(obj.id);
  return !ids;
})


// let finalArr = Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse)


// console.log(arr)
// console.log(finalArr)

// document.body.style.height = '2000px';
// let up = document.querySelector('.up');

// window.addEventListener('scroll', function () {
//   if (window.scrollY >= 500) {
//     up.style.display = 'block'
//   } else {
//     up.style.display = 'none'
//   }
// })

// up.addEventListener('click', function () {
//   scroll({
//     top:0,
//     behavior:"smooth"
//   })
// })