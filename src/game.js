import sampleSize from 'lodash.samplesize'
import shuffle from 'lodash.shuffle'
import AV from 'leancloud-storage'

export default class Game {
  constructor (options) {
    options || (options = {})
    this.questions = [] // id, image, answer, imageLoaded, selection
    this.currentQuestionIndex = -1
    this.onDataLoaded = options.onDataLoaded
    this._init()
  }

  _init () {
    AV.init({
      appId: '8F4nNRT9I69fCfcI3plgYFsK-gzGzoHsz',
      appKey: 'zhOFbNWxHneLcTTHCDLFPY6P'
    })

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
    let query = new AV.Query('Event')

    query.find().then(events => {
      events.forEach(event => {
        questions.push({
          id: event.id,
          image: event.get('image'),
          answer: event.get('title'),
          description: event.get('description') || 'test description here'
        })
      })

      this.questions = shuffle(questions).filter((_, index) => {return index < 20})
      this._loadImageForNextQuestion()

      this.onDataLoaded && this.onDataLoaded()
    })
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
    this.nextQuestion()
  }

  pause () {
    this.timer.pause()
  }

  stop () {

  }

  submitAnswer (key) {
    let currentQuestion = this.currentQuestion()
    currentQuestion.selected = key

    if (currentQuestion.selected === currentQuestion.id) {
      return true
    } else {
      return false
    }
  }

  submitResult () {
    let rightAnswers = this.questions.filter(q => q.id === q.selected).length
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
