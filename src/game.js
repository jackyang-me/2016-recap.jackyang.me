import sampleSize from 'lodash.samplesize'
import shuffle from 'lodash.shuffle'

export default class Game {
  constructor () {
    this.questions = [] // id, image, answer, imageLoaded, selection
    this.currentQuestionIndex = -1

    this.timer = null

    this._init()
  }

  _init () {
    this._loadQuestions()
  }

  _generateRandomAnswers (questionId) {
    let targetAnswer = this.questions.filter(q => q.id === questionId)[0]
    let answers = sampleSize(this.questions.filter(q => q.id !== questionId), 3) // random picker other 3 answers
    answers.push(targetAnswer)
    return shuffle(answers.map(a => {
      return {
        questionId: a.id,
        text: a.answer
      }
    }))
  }

  _loadQuestions () {
    let questions = []
    for (let i = 0; i < 10; i++) {
      questions.push({
        id: i,
        image: 'http://ofkyhrvda.bkt.clouddn.com/post/image/o_1b1ivdeus42bp02bsfou1ctc7.png',
        answer: 'answer for question ' + i
      })
    }
    this.questions = shuffle(questions)
    this._loadImageForNextQuestion()
  }

  _loadImageForNextQuestion () {
    let nextQuestion = this.questions[this.currentQuestionIndex + 1]
    let image = null

    if (nextQuestion) {
      image = new Image()
      image.onload = function () {
        nextQuestion.imageLoaded = true
      }
      image.src = nextQuestion.image
    }
  }

  start () {

  }

  stop () {

  }

  submitAnswer (key) {
    let currentQuestion = this.questions[this.currentQuestionIndex]
    currentQuestion.selected = key
    if (currentQuestion.selected === currentQuestion.id) {
      console.log('right answer')
    } else {
      console.log('wrong answer')
    }
  }

  submitResult () {
    let rightAnswers = this.questions.filter(q => q.id === q.selected).length
    console.log('right count', rightAnswers)
  }

  currentQuestion () {
    return this.questions[this.currentQuestionIndex]
  }

  nextQuestion () {
    let question = null
    if (this.currentQuestionIndex === this.questions.length - 1) {
      return question
    } else {
      question = this.questions[++this.currentQuestionIndex]
      question.selection = this._generateRandomAnswers(question.id)
      this._loadImageForNextQuestion()
      return question
    }
  }
}
